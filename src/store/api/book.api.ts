import { IBook, IBookFull } from "../../types/book.types";
import { api } from "./api";
import { IBookData } from './../../types/book.types';
interface IFilterParams{
    title?:string,
    genres?: number[]
    page?: number,
    perPage?: number
}
interface IPaginationValues{
    count: number
    current_page: number
    per_page: number
    total: number
    total_pages: number
}
export const bookApi = api.injectEndpoints({
    endpoints: builder => ({
        getBooks: builder.query<{data:IBook[], pagination:IPaginationValues}, IFilterParams>({
            query: (params) => ({
                url: '/books',
                params: {...params}
            }),
            transformResponse: (data: { data: IBook[], pagination: IPaginationValues }) =>{
                return {data: data.data, pagination:data.pagination}
            },
            providesTags: (result, error, arg) =>
                result
                ?
                    [
                        ...result.data.map(({ id }) => ({ type: 'Book' as const, id })),
                        { type: 'Book', id: 'PARTIAL-LIST' },
                    ]   
                : [{ type: 'Book', id: 'PARTIAL-LIST' }],
        }),
        getBook: builder.query<IBook, number>({
            query: (bookId) => `/books/${bookId}`,
            providesTags: (result, error, arg) => [{ type: 'Book' as const, id: arg }]
        }),
        createBook: builder.mutation<null, IBookData>({
            query: (book) => ({
                body: book,
                url: '/books',
                method: 'POST'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Book' as const, id: 'PARTIAL-LIST' }
            ]
        }),
        updateBook: builder.mutation<null, IBook>({
            query: (book) => ({
                body: book,
                url: `/books/${book.id}`,
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Book', id: arg.id }, {type: 'Book', id: 'PARTIAL-LIST'}]
        }),
        deleteBook: builder.mutation<null, number>({
            query: (id) => ({
                body: id,
                url: `/books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Book', id},
                { type: 'Book', id: 'PARTIAL-LIST' },
            ]
        })
    })
})
export const {useGetBooksQuery, useGetBookQuery, useLazyGetBookQuery, useCreateBookMutation} = bookApi;