import { IGenre, IGenreData } from "../../types/genre.types";
import { api } from "./api";

export const genreApi = api.injectEndpoints({
    endpoints: builder => ({
        getGenres: builder.query<IGenre[], null>({
            query: () => '/genres',
            providesTags: (result = [], error, arg) => [
                'Genre' as const,
                ...result.map(({ id }) => ({ type: 'Genre' as const, id }))
              ]
        }),
        getGenre: builder.query<IGenre, number>({
            query: (genreId) => `/genres/${genreId}`,
            providesTags: (result, error, arg) => [{ type: 'Genre' as const, id: arg }]
        }),
        createGenre: builder.mutation<null, IGenreData>({
            query: (genre) => ({
                body: genre,
                url: '/genres',
                method: 'POST'
            }),
            invalidatesTags: () => [{
                type: 'Genre'
            }]
        }),
        updateGenre: builder.mutation<null, IGenre>({
            query: (genre) => ({
                body: genre,
                url: `/genres/${genre.id}`,
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Genre', id: arg.id }]
        }),
        deleteGenre: builder.mutation<null, number>({
            query: (genreId) => ({
                body: genreId,
                url: `/genres/${genreId}`,
                method: 'DELETE'
            }),
            invalidatesTags: () => [{
                type: 'Genre'
            }]
        })
    })
})