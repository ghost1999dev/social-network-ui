import React, { createContext, useState, useEffect } from "react";
import { Global } from "../helpers/Global";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({})
  const [counter, setCounter] = useState({})
  const [loading,setLoading] = useState(true)
  useEffect(()=>{
     localData()
     counters()
  },[])

  const localData = async()=>{
     //Sacar el token y el user que esta en localstorage
     const objetoUsuario = localStorage.getItem("usuario")
     //Comprobar si el token y el objeto usuario vienen
     if (!objetoUsuario) {
       setLoading(false)
       return false
     }
     const objetoParseado = JSON.parse(objetoUsuario)
     setAuth(objetoParseado)
     setLoading(false)
  }
  const counters = async()=>{
    const token = localStorage.getItem("token")
    const objetoUsuario = localStorage.getItem("usuario")
    //Verificar si viene el token y el objeto usuario
    if (!objetoUsuario) {
      return false
    }
    const objetoParseado = JSON.parse(objetoUsuario)
    const request = await fetch(Global.url + '/counters/' + objetoParseado.data._id,{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization': objetoParseado.token
      }
    })
    const responseRequest = await request.json()
    setCounter(responseRequest)
  }
  return (<AuthContext.Provider
            value={{
                auth,
                counter,
                loading,
                setCounter,
                setAuth
            }}
        >
            {children}
    </AuthContext.Provider>
  );
};

export default AuthContext
