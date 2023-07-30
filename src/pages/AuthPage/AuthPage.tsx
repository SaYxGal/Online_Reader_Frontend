import React, { useState } from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import cl from "./AuthPage.module.css"
import { useLoginUserMutation, useRegisterUserMutation } from '../../store/api/userApi';

interface AuthPageProps{
    isLoginPage: boolean
}
export default function AuthPage({isLoginPage}: AuthPageProps): JSX.Element {
    const navigate = useNavigate();
    const [loginUser] = useLoginUserMutation();
    const [createUser] = useRegisterUserMutation();
    const [error, setError] = useState<string>('');
    const [user, setUser] = useState<IUserInput>({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    })
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        if(isLoginPage){
            loginUser(user).unwrap().then((payload) =>{
                setError('');
                setUser({name: '', email: '', password: '', repeatPassword: ''});
                localStorage.setItem('token', payload.access_token);
                navigate('/')
            }).catch((error) => {
                setError(error.data.error);
            })
        }
        else{
            createUser(user).unwrap().then((payload) => {
                if(payload.error){
                    setError(payload.error)
                    setUser({...user, repeatPassword: ''})
                }else{
                    setError('')
                    setUser({name: '', email: '', password: '', repeatPassword: ''});
                    navigate('/login')
                }
            }).catch((error) => console.log(error))
        }
    }
  return (
    <form onSubmit={(e) => handleSubmit(e)} style={{border:"1px solid #ccc"}}>
        <div className={cl.container}>
            {error?<span style={{color:"red"}}>{error}</span>: null}
            <h1>{isLoginPage? "Войти" : "Зарегистрироваться"}</h1>
            <p>Пожалуйста, заполните данную форму</p>
            <hr/>
            {
                !isLoginPage
                ?
                <>
                    <label htmlFor="name"><b>Имя пользователя:</b></label>
                    <input type="text" placeholder="Введите имя" name="name" 
                        value={user.name} onChange={(e) => setUser({...user, name: e.target.value})} required/>
                </>
                : null
            }
            <label htmlFor="email"><b>Эл.почта:</b></label>
            <input type="email" placeholder="Введите почту" name="email"
                value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required/>
            <label htmlFor="psw"><b>Пароль:</b></label>
            <input type="password" placeholder="Введите пароль:" name="psw"
                value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} required/>
            {
                !isLoginPage
                ?
                <>
                    <label htmlFor="psw-repeat"><b>Повторите пароль:</b></label>
                    <input type="password" placeholder="Повторный пароль" name="psw-repeat"
                        value={user.repeatPassword} onChange={(e) => setUser({...user, repeatPassword: e.target.value})} required/>
                </>
                : null
            }
            <div className={cl.clearfix}>
                <button type="submit" className={cl.submitbtn}>{isLoginPage? "Войти" : "Зарегистрироваться"}</button>
                {
                    isLoginPage?
                    <Link to="/signup"><button type="button" className={cl.cancelbtn}>Создать аккаунт</button></Link>
                    :
                    <Link to="/login"><button type="button" className={cl.cancelbtn}>Назад</button></Link>
                }
            </div>
        </div>
    </form>
  )
}
