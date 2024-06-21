import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from "../../helpers/Global";
export const Register = () => {

  const {changed,form} = useForm({})
  const [saved,savedState] = useState("no_enviado")
  const guardarValores = async (e)=>{
    e.preventDefault()
    let objetoUsuario = form
    //Guardar el usuario por fetch
    const request = await fetch(Global.url +'registro-usuario',{
      method:"POST",
      body:JSON.stringify(objetoUsuario),
      headers:{
        'Content-Type':"application/json"
      }
    })

    const data = await request.json()
    if (data.status ==='success') {
      savedState('saved')
      
    }else{
      savedState("error")
    }
  }
  return (
    <>
      <header className="content__header content__header--public">
          <h1 className="content__title">Registro</h1>
      </header>
      <div className="content__posts">
        {saved == "saved" ? <strong className='alert alert-success'>Usuario se registro correctamente</strong>
        : ""}
        {saved == "error" ?
           <strong className='alert alert-danger'>Usuario no se registro</strong>
        : ""}
       
          <form className='register-form'>
            <div className='form-group'>
              <label htmlFor="name">Nombre</label>
              <input type="text" name='name' onChange={changed} />
            </div>

            <div className='form-group'>
              <label htmlFor="apellidos">Apellidos</label>
              <input type="text" name='surname' onChange={changed} />
            </div>

            <div className='form-group'>
              <label htmlFor="nick">Nick</label>
              <input type="text" name='nick' onChange={changed} />
            </div>

            <div className='form-group'>
              <label htmlFor="email">Correo electronico</label>
              <input type="email" name='email' onChange={changed} />
            </div>

            <div className='form-group'>
              <label htmlFor="password">Contraseña</label>
              <input type="password" name='password' onChange={changed} />
            </div>

            <input 
              type="submit" 
              value="Registrate" 
              className='btn btn-success'
              onClick={guardarValores}
             />
          </form>
      </div>
    </>
  )
}
