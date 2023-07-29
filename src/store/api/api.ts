import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { RootState } from '..';
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Book', 'Genre'],
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_QUERY,
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

    })
});