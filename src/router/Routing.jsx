import React from 'react'
import { Routes,Route,BrowserRouter,Navigate } from "react-router-dom";
import { PublicLayout } from '../components/layout/public/PublicLayout';
import { Login } from '../components/users/Login';
import {  Register} from "../components/users/Register";
import { PrivateLayout } from '../components/layout/general/PrivateLayout';
import { Feed } from '../components/publications/Feed';
export const Routing = () => {
  return (
    
    <BrowserRouter>
        <Routes>

            <Route path="/" element={<PublicLayout/>}>
                <Route index element={<Login/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='registro' element={<Register/>}/>
            </Route>
            <Route path="/social" element ={<PrivateLayout/>}>
              <Route index element={<Feed/>}/>
            </Route>
            <Route path='*' element={
              <h2>Error 404</h2>
            }>

            </Route>

        </Routes>
        


    </BrowserRouter>
  )
}
