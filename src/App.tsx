import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage/MainPage'
import BooksPage from './pages/BooksPage/BooksPage'
import Navbar from './components/Navbar/Navbar'
import AboutPage from './pages/AboutPage/AboutPage'
import AuthPage from './pages/AuthPage/AuthPage'
export interface IPage{
  name?:string,
  path:string,
  element: JSX.Element
}
function App() {
  const pages: IPage[] = [
    {name: "Главная", path: "/", element: <MainPage/>},
    {name: "Книги", path: "/books", element: <BooksPage/>},
    {name: "О сайте", path: "/about", element: <AboutPage/>},
    {path: "/login", element: <AuthPage isLoginPage={true}/>},
    {path: "/signup", element: <AuthPage isLoginPage={false}/>},
  ]
  return (
    <BrowserRouter>
      <Navbar pages={pages.filter(page => page.name !== undefined)}/>
      <Routes>
        {
          pages.map((page, index) => <Route element={page.element} path={page.path} key={index}/>)
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
