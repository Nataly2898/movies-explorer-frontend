import React from "react";
import { useLocation } from 'react-router-dom';
import "./Header.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo-header.svg";
import Navigation from "../Navigation/Navigation";


const Header = ({ loggedIn }) => {

  const { pathname } = useLocation();

  const classHeader = `header ${pathname === '/' ? 'header_home' : ''}`;

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
