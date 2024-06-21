import React from 'react'
import { Header } from "./Header";
import { Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from "./Sidebar";
import useAuth from '../../../hooks/useAuth';
export const PrivateLayout = () => {
  const {auth} = useAuth()
  return (
    <>
        {/*LAYOUT* CABECERA */}
        <Header/>

        <section className='layout__content'>
          {auth.data?._id ?
            <Outlet/>
          :<Navigate to="/login"/>}
            
        </section>

        {/**BARRA LATERAL */}
        
        <Sidebar/>
    </>
  )
}
