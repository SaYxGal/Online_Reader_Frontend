import {logout, setUser} from "../userSlice"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface IGenericResponse {
    status: string;
    message: string;
}
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_QUERY + "/auth",
    }),
    endpoints: builder => ({
        registerUser: builder.mutation<IGenericResponse, IUserInput>({
            query(data) {
              return {
                url: 'register',
                method: 'POST',
                body: data,
              };
            },
        }),
        loginUser: builder.mutation<{ access_token: string; status: string },IUserInput>({
            query(user) {
                return {
                url: 'login',
                params: {email: user.email, password: user.password},
                method: 'POST'
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    await dispatch(userApi.endpoints.getMe.initiate(null));
                } catch (error) {}
            },
        }),
        logoutUser: builder.mutation<void, void>({
            query() {
              return {
                url: 'logout'
              };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
              await queryFulfilled;
              dispatch(logout());
            }
        }),
        getMe: builder.query<IUser, null>({
            query() {
              return {
                url: 'me'
              };
            },
            transformResponse: (result: { data: { user: IUser } }) =>
              result.data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
              try {
                const { data } = await queryFulfilled;
                dispatch(setUser(data));
              } catch (error) {}
            },
        }),
    })
})
export const {useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetMeQuery} = userApi;