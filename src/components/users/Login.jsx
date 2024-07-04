import React, { useState } from 'react'
import { useForm } from "../../hooks/useForm";
import {Global } from "../../helpers/Global";
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
  const {form,changed} = useForm({})
  const [value,setValue] = useState('')
  const {auth,setAuth}=useAuth()
  const navigate = useNavigate()
  const loginUser = async (e)=>{
    e.preventDefault()
    let userToLogin = form
    //Peticion al backend
    try {
    const request = await fetch(Global.url+'/login',{
      method:"POST",
      body:JSON.stringify(userToLogin),
      headers: {
        'Content-Type':'application/json'
      }

    })
    const data = await request.json()
    
    if (data.status == 'success') {
      localStorage.setItem('usuario',JSON.stringify(data))
      setValue('success')
      setAuth(data)
      navigate("/social")
    }else{
      
      setValue('error')
    }
  }catch (error) {
      console.log('Error en la peticion ', error);
  }
  }
  return (
    <>
      <header className="content__header content__header--public">
          <h1 className="content__title">Login</h1>
          
      </header>
      <div className="content__posts">
        {value == 'success' ? 
          <strong className='alert alert-success'>{auth.message}</strong>
          : ''
        }
        {value == 'error' ?
          <strong className='alert alert-danger'>{auth.message}</strong>
        :''}
        <form className='login-form' onSubmit={loginUser}>
          <div className='form-group'>
            <label htmlFor="email">Email</label>
            <input type="email" name='email' onChange={changed} />
          </div>
          <div className='form-group'>
            <label htmlFor="">Password</label>
            <input type="password" name='password' onChange={changed} />
          </div>
          <input type="submit" value="Identificate"/>
        </form>
      </div>
    </>
  )
}
