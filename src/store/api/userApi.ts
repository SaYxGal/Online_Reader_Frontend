import {logout, setUser} from "../userSlice"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
interface IGenericResponse {
    message?: string;
    error?: string;
}
interface ILoginResponse{
  access_token: string;
  token_type: string;
  expires_in: number;
}
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_QUERY + "/auth",
        prepareHeaders: (headers) => {
          const token = localStorage.getItem('token')
          // If we have a token set in state, let's assume that we should be passing it.
          if (token) {
            headers.set('authorization', `Bearer ${token}`);
          }
          return headers;
      },
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
        loginUser: builder.mutation<ILoginResponse,IUserInput>({
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
                url: 'logout',
                method: 'POST'
              };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
              await queryFulfilled;
              dispatch(logout());
              localStorage.removeItem('token');
            }
        }),
        getMe: builder.query<IUser, null>({
            query() {
              return {
                url: 'me',
                method: 'POST'
              };
            },
             transformResponse: (data: { user: IUser }) =>
              data.user,
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
              try {
                const {data} = await queryFulfilled;
                console.log(data)
                dispatch(setUser(data));
              } catch (error) {}
            },
        }),
    })
})
export const {useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetMeQuery} = userApi;