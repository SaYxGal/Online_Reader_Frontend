import React from 'react'
import { Link } from 'react-router-dom'
import cl from "./BookItem.module.css"
export default function BookItem() {
  return (
    <div className={cl.bookWrapper}>
        <figure>
            <img src="https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg" alt="Book image"/>
            <figcaption>BookItem</figcaption>
        </figure>
        <div className={cl.bookBody}>
            <p>Description of bookggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg</p>
            <h3>Жанры:</h3>
            <div className={cl.bookGenres}>
                <div>Романтика</div>
                <div>Повседневность</div>
                <div>Комедия</div>
            </div>
            <Link className={cl.link} to="/books/1">Подробнее...</Link>
        </div>
    </div>
  )
}
