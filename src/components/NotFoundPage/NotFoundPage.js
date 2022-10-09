import React from "react";
//import { Link, useHistory } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = ({ back }) => {

  return (
    <main>
      <section className="notfoundpage">
        <h1 className="notfoundpage__title">404</h1>
        <h2 className="notfoundpage__subtitle">Страница не найдена</h2>
        <button className="notfoundpage__link" onClick={back}>
          Назад
        </button>
      </section>
    </main>
  );
};

export default NotFoundPage;
