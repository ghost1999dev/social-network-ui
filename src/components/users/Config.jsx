import React, { useState } from "react";
import { useForm } from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import { SerializerData } from "../../helpers/SerializerData";
import { Global } from "../../helpers/Global";
export const Config = () => {
    const[saved,setSaved]=useState("no_enviado")
    const {auth}=useAuth({})
    const{changed} = useForm({})
    const editarValores =async (e)=>{
      e.preventDefault()
      const dataObject=SerializerData(e.target)
      delete dataObject.file0
      console.log(auth.token);
      //Actualizar datos
      /*const request = await fetch(Global.url + 'update-user',{
        method:"PUT",
        body:JSON.stringify(dataObject),
        headers:{
          'Content-Type':'application/json',
          'Authorization':''
        }
      })*/
     
    }
    
  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>
      <div className="content__posts">
        {saved == "saved" ? (
          <strong className="alert alert-success">
            Usuario se registro correctamente
          </strong>
        ) : (
          ""
        )}
        {saved == "error" ? (
          <strong className="alert alert-danger">Usuario no se registro</strong>
        ) : (
          ""
        )}

        <form className="register-form" onSubmit={editarValores}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input type="text" name="name" defaultValue={auth.data.name}  />
          </div>

          <div className="form-group">
            <label htmlFor="apellidos">Apellidos</label>
            <input type="text" name="surname" defaultValue={auth.data.nick}  />
          </div>
          <div className="form-group">
            <label htmlFor="biografia">Biografia</label>
            <textarea name="biografia" id=""></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="nick">Nick</label>
            <input type="text" name="nick" defaultValue={auth.data.nick}  />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electronico</label>
            <input type="email" name="email" defaultValue={auth.data.email}  />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password"  />
          </div>
          <div className="form-group">
            <label htmlFor="file0">Avatar</label>
            <div className="avatar">
                {/**MOSTRAR IMAGEN */}
            </div>
            <input type="file" name="file0" id="file" />
          </div>

          <input
            type="submit"
            value="Registrate"
            className="btn btn-success"
            
          />
        </form>
      </div>
    </>
  );
};
