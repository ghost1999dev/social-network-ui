import React from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";

export const Nav = () => {
  const { auth } = useAuth();
  
  return (
    <nav className="navbar__container-lists">
      <ul className="container-lists__menu-list">
        <li className="menu-list__item">
          <a href="#" className="menu-list__link">
            <i className="fa-solid fa-house"></i>
            <span className="menu-list__title">Inicio</span>
          </a>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/feed" className="menu-list__link">
            <i className="fa-solid fa-list"></i>
            <span className="menu-list__title">Timeline</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/personas" className="menu-list__link">
            <i className="fa-solid fa-user"></i>
            <span className="menu-list__title">Gente</span>
          </NavLink>
        </li>

        <li className="menu-list__item">
          <NavLink to="/social/mensajes" className="menu-list__link">
            <i className="fa-regular fa-envelope"></i>
            <span className="menu-list__title">Mensajes</span>
          </NavLink>
        </li>
        <li className="menu-list__item">
          <NavLink to="/social/ajustes" className="menu-list__link">
            <i className="fa-regular fa-envelope"></i>
            <span className="menu-list__title">Ajustes</span>
          </NavLink>
        </li>
        <li className="menu-list__item">
          <NavLink to="/social/logout" className="menu-list__link">
            <i className="fa-regular fa-envelope"></i>
            <span className="menu-list__title">Cerrar sesion</span>
          </NavLink>
        </li>
      </ul>

      <ul className="container-lists__list-end">
        <li className="list-end__item">
          <a href="#" className="list-end__link-image">
            <img
              src={Global.url + "/avatar/"+ (auth?.image || 'default.jpg')}
              className="list-end__img"
              alt="Imagen de perfil"
            />
          </a>
        </li>
        <li className="list-end__item">
          <a href="#" className="list-end__link">
            <span className="list-end__name">{auth?.nick}</span>
            <i className="fa-solid fa-caret-down"></i>
          </a>
        </li>
      </ul>
    </nav>
  );
};
