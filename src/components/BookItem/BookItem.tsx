import React from 'react'
import { Link } from 'react-router-dom'
import cl from "./BookItem.module.css"
import { IBook } from '../../types/book.types'
interface IBookItemProps{
  book: IBook
}
export default function BookItem({book}: IBookItemProps) {
  return (
    <div className={cl.bookWrapper}>
        <figure>
            <img src="https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg" alt="Book image"/>
            <figcaption>{book.title}</figcaption>
        </figure>
        <div className={cl.bookBody}>
            <p>{book.description}</p>
            <h3>Жанры:</h3>
            <div className={cl.bookGenres}>
              {
                book.genres.map((genre) =>(
                  <div key={genre.id}>{genre.name}</div>
                ))
              }
            </div>
            <Link className={cl.link} to={`/books/${book.id}`}>Подробнее...</Link>
        </div>
    </div>
  )
}
