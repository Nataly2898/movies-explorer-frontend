import React from "react";
import { useLocation } from 'react-router-dom';
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo-header.svg";
import Navigation from "../Navigation/Navigation";
import Token from "../../utils/token";


const Header = () => {
  const { pathname } = useLocation();

  const loggedIn = Token.get()

  const classHeader = `header ${pathname === '/' ? loggedIn ? 'header_home_white' : 'header_home' : ''}`;

  return (
    <header className={classHeader}>
      <Link to="/">
        <img src={logo} alt="Логотип" className="header__logo" />
      </Link>
      <Navigation loggedIn={loggedIn} />
    </header>
  );
};

export default Header;
