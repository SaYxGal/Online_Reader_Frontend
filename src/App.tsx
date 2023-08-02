import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import BooksPage from './pages/BooksPage/BooksPage'
import Navbar from './components/Navbar/Navbar'
import AboutPage from './pages/AboutPage/AboutPage'
import AuthPage from './pages/AuthPage/AuthPage'
import PrivateRoute from './util/PrivateRoute'
import { useEffect } from 'react'
import { useLazyGetMeQuery } from './store/api/userApi'
import BookForm from './components/BookForm/BookForm'
export interface IPage{
  name?:string,
  path:string,
  element: JSX.Element,
  role?: "ADMIN"|"USER"
}
function App() {
  const [trigger] = useLazyGetMeQuery();
  useEffect(() =>{
    if(localStorage.getItem('token')){
      trigger(Date.now());
    }
  },[])
  const pages: IPage[] = [
    {name: "Главная", path: "/", element: <MainPage/>},
    {name: "Книги", path: "/books", element: <BooksPage/>},
    {name: "О сайте", path: "/about", element: <AboutPage/>, role:"ADMIN"},
    {path: "/login", element: <AuthPage isLoginPage={true}/>},
    {path: "/signup", element: <AuthPage isLoginPage={false}/>},
    {path: "/books/store/:id", element:<BookForm/>}
  ]
  return (
    <BrowserRouter>
      <Navbar pages={pages.filter(page => page.name !== undefined)}/>
      <Routes>
        <Route element={<PrivateRoute role={"USER"}/>}>
          {
            pages.filter(page => page.role == "USER")
            .map((page, index) =><Route element={page.element} path={page.path} key={index}/>)
          }
        </Route>
        <Route element={<PrivateRoute role={"ADMIN"}/>}>
          {
            pages.filter(page => page.role == "ADMIN")
            .map((page, index) =><Route element={page.element} path={page.path} key={index}/>)
          }
        </Route>
        {
          pages.filter(page => page.role === undefined)
          .map((page, index) => <Route element={page.element} path={page.path} key={index}/>)
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
