import React from 'react'
import BookItem from '../BookItem/BookItem'
import cl from "./BookList.module.css"
export default function BookList() {
  return (
    <>
        <h1>Список книг</h1>
        <div className={cl.bookList}>
            <BookItem/>
            <BookItem/>
        </div>
    </>
  )
}
