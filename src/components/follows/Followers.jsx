import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import useAuth from "../../hooks/useAuth";
import { UserList } from "./UserList";


//FERNANDODEV
//MAKING THE CODE
export const Following = () => {
  const { auth } = useAuth();
  const [users, setUsers] = useState([]);
  const [more, setMore] = useState(true);
  const [following, setFollowing] = useState([]);
  //Estado paginacion
  const [page, setPage] = useState(1);
  useEffect(() => {
    console.log(auth);
    getUsers(1);
  }, []);
  const getUsers = async (nextPage = 1) => {
    //Primero hacer el fetch
    const dataUsuario = await fetch(Global.url + "/following/" + nextPage + "/", {
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
    console.log(dataResponseUsers);
    setFollowing(dataResponseUsers.user_following);
    if (
      users.length >=
      dataResponseUsers.total - dataResponseUsers.users.length
    ) {
      setMore(false);
    }
  };
  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Usuarios</h1>
        </header>

        <UserList
          users={users}
          setUsers={setUsers}
          following={following}
          setFollowing={setFollowing}
          auth={auth}
          more={more}
          page={page}
          setPage={setPage}
          getUsers={getUsers}
        />
      </section>
    </>
  );
};
