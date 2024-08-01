import React from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Global";
import { useParams } from "react-router-dom";
export const UserList = ({
  users,
  setUsers,
  following,
  setFollowing,
  auth,
  more,
  page,
  setPage,
  getUsers,
}) => {
  
  const follow = async (userId) => {
    const objectUserId = {
      followed: userId,
    };
    const request = await fetch(Global.url + "/pagination/" + nextPage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
      body: JSON.stringify(objectUserId),
    });
    const requestResponse = await request.json();
    if (requestResponse.status === "success") {
      setFollowing([...following, userId]);
    }
  };
  const unFollow = async (userId) => {
    const request = await fetch(Global.url + "/follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth.token,
      },
    });
    const requestResponse = await request.json();

    if (requestResponse.status === "success") {
      const followingFilter = following.filter(
        (followingUserId) => userId !== followingUserId
      );

      setFollowing(followingFilter);
    }
  };
  const nextPage = () => {
    let next = page + 1;
    setPage(next);
    getUsers(next);
  };
  return (
    <div className="content__posts">
      {users.map((user) => {
        return (
          <article className="posts__post" key={user?._id}>
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
            {auth.data._id != user._id && (
              <div className="post__buttons">
                {!following.includes(user._id) ? (
                  <button
                    href="#"
                    className="post__button post__button--green"
                    onClick={() => {
                      follow(user._id);
                    }}
                  >
                    Seguir
                  </button>
                ) : (
                  ""
                )}
                {following.includes(user?._id) ? (
                  <button
                    href="#"
                    className="post__button post__button--green"
                    onClick={() => {
                      unFollow(user._id);
                    }}
                  >
                    Dejar de seguir
                  </button>
                ) : (
                  ""
                )}
              </div>
            )}
          </article>
        );
      })}
      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas usuarios
          </button>
        </div>
      )}
    </div>
  );
};
