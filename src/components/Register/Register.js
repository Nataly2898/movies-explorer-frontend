import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Form from "../Form/Form";
import "./Register.css";

function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  function handleChangeName(e) {
    const validName = /^[a-zA-Z-А-Яа-яЁё\s ]+$/.test(e.target.value);

    if (e.target.value.length < 2) {
      setNameError("Длина имени должна быть не менее 2 символов");
    } else if (e.target.value.length > 30) {
      setNameError("Длина имени должна должна быть не более 30 символов");
    } else if (!validName) {
      setNameError("В поле Имя возможно использовать латиницу, кириллицу, пробел или дефис");
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

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

    props.onRegister({ name, email, password });
  }

  useEffect(() => {
    if (
      name &&
      email &&
      password &&
      !nameError &&
      !emailError &&
      !passwordError
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [name, email, password, nameError, emailError, passwordError]);

  return (
    <Form
      name="Register"
      id="form-register"
      title="Добро пожаловать!"
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      Link={
        <Link to="/signin" className="form__request-auth">
          Уже зарегистрированны?
          <span className="form__request-span"> Войти</span>
        </Link>
      }
    >
      <label className="form__field form__field-text">
        Имя
        <input
          id="name-input"
          className={`form__item ${
            nameError ? "form__item-error" : "form__item_green"
          }`}
          type="text"
          value={name}
          onChange={handleChangeName}
          required
        />
        <span id="name-input-error" className="form__span-error">
          {nameError}
        </span>
      </label>
      <label className="form__field form__field-text">
        E-mail
        <input
          id="email-input"
          className={`form__item ${emailError ? "form__item-error" : ""}`}
          type="text"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <span id="name-input-error" className="form__span-error">
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
        <span id="about-input-error" className="form__span-error">
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
          Зарегистрироваться
        </button>
      </div>
    </Form>
  );
}

export default Register;
