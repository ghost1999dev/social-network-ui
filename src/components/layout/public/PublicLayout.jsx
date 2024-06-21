import React from 'react'
import { Header } from "./Header";
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
export const PublicLayout = () => {
  const {auth,compartido,counter} = useAuth()
  console.log(auth);
  return (
    <>
        {/*LAYOUT* */}
        <Header/>

        <section className='layout__content'>
         {auth.data?._id ?
          <Navigate to="/social"/>
         :
          <Outlet/>
         }
            
        </section>
    
    </>
  )
}
