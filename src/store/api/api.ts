import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { RootState } from '..';
import { baseQueryCustom } from '../util/baseQueryFunc';
export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Book', 'Genre'],
    baseQuery: baseQueryCustom,
    endpoints: builder => ({

    })
});