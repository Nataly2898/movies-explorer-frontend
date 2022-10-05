import React from "react";
import { Link } from "react-router-dom";
import "./Form.css";
import logo from "../../images/logo-header.svg";

function Form(props) {
  return (
    <section id={props.name}>
      <form className="form" id={props.id} onSubmit={props.onSubmit}>
      <Link to="/">
            <img src={logo} alt="Логотип" className="form__logo" />
          </Link>
        <div className="form__container form__container_auth">
          <h2 className="form__heading">{props.title}</h2>
          <fieldset className="form__input-container">
            {props.children}
          </fieldset>
          {props.Link}
        </div>
      </form>
    </section>
  )
}

export default Form;
