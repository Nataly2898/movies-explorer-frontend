import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "./Login.css";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  function handleChangeEmail(e) {
    const validEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(
      e.target.value
    );

    if (!validEmail) {
      setEmailError("Неверный формат почты");
    } else {
      setEmailError("");
    }
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    if (e.target.value.length < 6) {
      setPasswordError("Пароль должен быть не менее 6 символов");
    } else {
      setPasswordError("");
    }
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.onLogin({ email, password });
  }

  useEffect(() => {
    if (props.loggedIn) {
      setEmail("");
      setPassword("");
    }
  }, [props.loggedIn]);

  React.useEffect(() => {
    if (email && password && !emailError && !passwordError) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [email, password, emailError, passwordError]);

  return (
    <>
      <Form
        name="Enter"
        id="form-enter"
        title="Рады видеть!"
        onSubmit={handleSubmit}
        Link={
          <Link to="/signup" className="form__request-auth">
            Ещё не зарегистрированы?
            <span className="form__request-span"> Регистрация</span>
          </Link>
        }
      >
        <label className="form__field form__field-text">
          E-mail
          <input
            id="email-input"
            className={`form__item ${
              emailError ? "form__item-error" : "form__item_green"
            }`}
            type="email"
            value={email}
            onChange={handleChangeEmail}
            required
          />
          <span id="name-input-error" className="form__item-error">
            {emailError}
          </span>
        </label>
        <label className="form__field form__field-text">
          Пароль
          <input
            id="password-input"
            className={`form__item ${passwordError ? "form__item-error" : ""}`}
            type="password"
            value={password}
            onChange={handleChangePassword}
            required
          />
          <span id="about-input-error" className="form__item-error">
            {passwordError}
          </span>
        </label>
        <div className="form__handlers">
          <div className="form__item-error form__item-response">
            {props.message}
          </div>
          <button
            className={`submit__button-form ${
              !formValid ? "submit__button-form_disabled" : ""
            }`}
            type="submit"
            disabled={!formValid}
          >
            Войти
          </button>
        </div>
      </Form>
    </>
  );
}

export default Login;