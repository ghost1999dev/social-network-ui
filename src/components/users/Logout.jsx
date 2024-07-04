import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export const Logout = () => {
    const {auth,setCounter,setAuth}=useAuth()
    const navigate = useNavigate()
    useEffect(()=>{
        //Vaciar el local storage
        localStorage.clear()
        //Setear estados globales
        setCounter({})
        setAuth({})
        navigate("/login")
    },[])
  return (
    <h1>Cerrando sesion</h1>
  )
}
