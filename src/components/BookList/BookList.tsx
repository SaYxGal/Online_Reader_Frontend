import React, { useEffect, useState } from 'react'
import BookItem from '../BookItem/BookItem'
import cl from "./BookList.module.css"
import { useGetBooksQuery } from '../../store/api/book.api';
import Pagination from './../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
export interface IURLObject{
  name:string,
  value:string
}
export default function BookList() {
  const [params, setParams] = useSearchParams();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetBooksQuery(
    {page:Number(params.get('page')),
     title: params.get('title')?? undefined});
  const handleURLChange = ({name, value}:IURLObject) =>{
    params.set(name, value);
    setParams(params);
  }
  return (
    <>
        <h1>Список книг</h1>
        <div className={cl.bookList}>
          {
            isSuccess?
            data.data.map((item) => (
              <BookItem key={item.id} book={item}/>
            ))
            : <div>Ждем</div>
          }
        </div>
        {
          isSuccess?
          <Pagination 
            page={data.pagination.current_page}
            totalPages={data.pagination.total_pages}
            changePage={handleURLChange}/>
          : null
        }
    </>
  )
}
