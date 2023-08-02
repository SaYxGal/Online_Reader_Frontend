import { IPage } from '../../App'
import {Link, useNavigate} from 'react-router-dom'
import cl from './Navbar.module.css'
import { useLogoutUserMutation } from '../../store/api/userApi'
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface INavbarProps{
    pages: IPage[]
}
export default function Navbar({pages}: INavbarProps) {
  const [logout] = useLogoutUserMutation();
  const navigate = useNavigate();
  const user = useTypedSelector(state => state.userState.user);
  return (
    <ul className={cl.Navbar}>
        {
            pages.map((page, index) => (
                !page.role || (user && (user.role == "ADMIN" || page.role == user.role))
                ?
                <Link className={cl.Link} key={index} to={page.path}>{page.name}</Link>
                :
                null
            ))
        }
        {
          localStorage.getItem('token')?
          <button className={cl.Link} onClick={() => logout().then(() => navigate('/'))}>Выйти</button>
          : 
          <Link className={cl.Link} to='/login'>Войти</Link>
        }
    </ul>
  )
}
