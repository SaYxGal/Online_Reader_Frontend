import { IGenre, IGenreData } from "../../types/genre.types";
import { api } from "./api";

export const genreApi = api.injectEndpoints({
    endpoints: builder => ({
        getGenres: builder.query<IGenre[], void>({
            query: () => '/genres',
            transformResponse: (data: { data: IGenre[]}) =>{
                return data.data;
            },
            providesTags: (result = [], error, arg) => {
                return [
                { type: 'Genre', value: 'LIST' },
                ...result.map(({ id }) => ({ type: 'Genre' as const, id })),
                ];
              },
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
                type: 'Genre', value: 'LIST' 
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
            invalidatesTags: (result, error, id) => [
                { type: 'Genre', id},
            ]
        })
    })
})
export const {useGetGenreQuery,
     useGetGenresQuery,
     useCreateGenreMutation,
     useUpdateGenreMutation, 
     useDeleteGenreMutation,
     useLazyGetGenresQuery} = genreApi;