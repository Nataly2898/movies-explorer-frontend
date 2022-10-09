import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./BurgerMenu.css";

const BurgerMenu = ({ onClose }) => {
  const { pathname } = useLocation();

  return (
    <div className="burger">
      <div className="burger__background">
        <div className="burger__container">
          <button
            type="button"
            className="burger__close-buton"
            onClick={() => onClose()}
          />
          <div className="burger__menu">
            <Link
              to="/"
              className={
                pathname === "/" ? "burger-link_active" : "burger-link"
              }
            >
              Главная
            </Link>
            <Link
              to="/movies"
              className={
                pathname === "/movies"
                  ? "burger-link_active"
                  : "burger-link"
              }
            >
              Фильмы
            </Link>
            <Link
              to="/saved-movies"
              className={
                pathname === "/saved-movies"
                  ? "burger-link_active"
                  : "burger-link"
              }
            >
              Сохранённые фильмы
            </Link>
          </div>
          <Link to="/profile">
            <div className="burger__account"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BurgerMenu;
