import React from 'react'
import cl from "./MainPage.module.css"
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { useNavigate } from 'react-router-dom';
export default function MainPage():JSX.Element {
  const user = useTypedSelector(state => state.userState.user);
  const navigate = useNavigate();
  return (
    <div className={cl.container}>
      <h1>Добро пожаловать на онлайн читалку</h1>
      <p>На данном сайте вы можете читать, публиковать, обсуждать книги.
         Каждая книга подразделена на главы со страницами. 
         На сайте присутствует поиск с фильтрацией по жанрам и названию.</p>
      {
        user 
        ? 
        <div>
          <button onClick={() => navigate('/books/store/0')}>Создать книгу</button>
        </div>
        :
        <p> Для публикации и комментирования книг необходимо пройти регистрацию.</p>
      }
    </div>
  )
}
