import { IPage } from '../../App'
import {Link, useNavigate} from 'react-router-dom'
import cl from './Navbar.module.css'
import React from 'react'
import { useLogoutUserMutation } from '../../store/api/userApi'

interface INavbarProps{
    pages: IPage[]
}
export default function Navbar({pages}: INavbarProps) {
  const [logout] = useLogoutUserMutation();
  const navigate = useNavigate();
  return (
    <ul className={cl.Navbar}>
        {
            pages.map((page, index) => (
                <Link className={cl.Link} key={index} to={page.path}>{page.name}</Link>
            ))
        }
        {
          localStorage.getItem('token')?
          <button className={cl.link} onClick={() => logout().then(() => navigate('/'))}>Выйти</button>
          : 
          <Link className={cl.link} to='/login'>Войти</Link>
        }
    </ul>
  )
}
