import { IBook, IBookFull } from "../../types/book.types";
import { api } from "./api";
import { IBookData } from './../../types/book.types';

export const bookApi = api.injectEndpoints({
    endpoints: builder => ({
        getBooks: builder.query<IBook[], null>({
            query: () => '/books',
            providesTags: (result = [], error, arg) => [
                'Book' as const,
                ...result.map(({ id }) => ({ type: 'Book' as const, id }))
              ]
        }),
        getBook: builder.query<IBookFull, number>({
            query: (bookId) => `/books/${bookId}`,
            providesTags: (result, error, arg) => [{ type: 'Book' as const, id: arg }]
        }),
        createBook: builder.mutation<null, IBookData>({
            query: (book) => ({
                body: book,
                url: '/books',
                method: 'POST'
            }),
            invalidatesTags: () => [{
                type: 'Book'
            }]
        }),
        updateBook: builder.mutation<null, IBook>({
            query: (book) => ({
                body: book,
                url: `/books/${book.id}`,
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Book', id: arg.id }]
        }),
        deleteBook: builder.mutation<null, number>({
            query: (bookId) => ({
                body: bookId,
                url: `/books/${bookId}`,
                method: 'DELETE'
            }),
            invalidatesTags: () => [{
                type: 'Book'
            }]
        })
    })
})
export const {useGetBooksQuery, useGetBookQuery, useCreateBookMutation} = bookApi;