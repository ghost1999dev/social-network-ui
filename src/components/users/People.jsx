import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";

export const People = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [more, setMore] = useState(true);
  //Estado paginacion
  const [page, setPage] = useState(1);
  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async (nextPage=1) => {
    //Primero hacer el fetch
    const dataUsuario = await fetch(Global.url + "/pagination/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    });
    const dataResponseUsers = await dataUsuario.json();
    let newUsers = dataResponseUsers.users;
    if (users.length >= 1) {
     
      newUsers = [...users, ...dataResponseUsers.users];
    }
    setUsers(newUsers);
    
    if (users.length == dataResponseUsers.total) {
      setMore(false)
    }
  };
  const nextPage = () => {
    let next = page + 1;
    setPage(next)
    getUsers(next);
  };
  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Usuarios</h1>
        </header>

        <div className="content__posts">
          {users.map((user) => {
            return (
              <article className="posts__post" key={user._id}>
                <div className="post__container">
                  <div className="post__image-user">
                    <a href="#" className="post__image-link">
                      
                      {/**MOSTRAR IMAGEN */}
                      {user?.image != "default_png" && (
                        <img
                          src={Global.url + "/avatar/" + user?.image}
                          className="container-avatar__img"
                          alt="Foto de perfil"
                        />
                      )}
                      {user?.image == "default_png" && (
                        <img
                          src={avatar}
                          className="container-avatar__img"
                          alt="Foto de perfil"
                        />
                      )}
                    </a>
                  </div>

                  <div className="post__body">
                    <div className="post__user-info">
                      <a href="#" className="user-info__name">
                        {user?.name}
                      </a>
                      <span className="user-info__divider"> | </span>
                      <a href="#" className="user-info__create-date">
                        Hace 1 hora
                      </a>
                    </div>

                    <h4 className="post__content">Hola, buenos dias.</h4>
                  </div>
                </div>

                <div className="post__buttons">
                  <a href="#" className="post__button post__button--green">
                    Seguir
                  </a>
                  {/*<a href="#" className="post__button post__button--green">
                    Dejar de seguir
                  </a>*/}
                </div>
              </article>
            );
          })}
        </div>
        {more && (
          <div className="content__container-btn">
            <button className="content__btn-more-post" onClick={nextPage}>
              Ver mas usuarios
            </button>
          </div>
        )}
      </section>
    </>
  );
};
