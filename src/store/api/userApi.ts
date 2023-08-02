import {logout, setUser} from "../userSlice"
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {baseQueryCustom} from '../util/baseQueryFunc'
interface IGenericResponse {
    message?: string;
    error?: string;
}
interface ITokenResponse{
  access_token: string;
  token_type: string;
  expires_in: number;
}
export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQueryCustom,
    endpoints: builder => ({
        registerUser: builder.mutation<IGenericResponse, IUserInput>({
            query(data) {
              return {
                url: '/auth/register',
                method: 'POST',
                body: data,
              };
            },
        }),
        loginUser: builder.mutation<ITokenResponse,IUserInput>({
            query(user) {
                return {
                url: '/auth/login',
                params: {email: user.email, password: user.password},
                method: 'POST'
                };
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const response = await queryFulfilled;
                    localStorage.setItem('token', response.data.access_token);
                    await dispatch(userApi.endpoints.getMe.initiate(Date.now()));
                } catch (error) {}
            },
        }),
        logoutUser: builder.mutation<void, void>({
            query() {
              return {
                url: '/auth/logout',
                method: 'POST'
              };
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
              await queryFulfilled;
              dispatch(logout());
              localStorage.removeItem('token');
            }
        }),
        refresh: builder.mutation<ITokenResponse, void>({
          query(){
            return{
              url: '/auth/refresh',
              method: 'POST'
            }
          }
        }),
        getMe: builder.query<IUser, number>({
            query() {
              return {
                url: '/auth/me',
                method: 'POST'
              };
            },
            transformResponse: (data:{user: IUser}) =>{
              return data.user;
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
              try {
                const {data} = await queryFulfilled;
                dispatch(setUser(data));
              } catch (error) {}
            },
        }),
    })
})
export const {useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetMeQuery, useLazyGetMeQuery} = userApi;