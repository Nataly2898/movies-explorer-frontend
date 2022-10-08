import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [changedName, setChangedName] = useState(false);
  const [changedEmail, setChangedEmail] = useState(false);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  function handleNameChange(e) {
    setChangedName(true);
    const validName = /^[a-zA-Z-А-Яа-яЁё\s ]+$/.test(e.target.value);

    if (e.target.value.length < 2) {
      setNameError("Длина имени должна быть не менее 2 символов");
    } else if (e.target.value.length > 30) {
      setNameError("Длина имени должна должна быть не более 30 символов");
    } else if (!validName) {
      setNameError(
        "В поле Имя возможно использовать латиницу, кириллицу, пробел или дефис"
      );
    } else {
      setNameError("");
    }
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setChangedEmail(true);
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

  function changeInputDisabled() {
    setIsInputDisabled(!isInputDisabled);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onEditUser({
      name,
      email,
    });
    changeInputDisabled();
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  useEffect(() => {
    const isNoUpdates = currentUser.name === name && currentUser.email === email

    if (nameError || emailError || isNoUpdates) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, name, email, currentUser.name, currentUser.email]);

  return (
    <>
      <Header />
      <section className="profile">
        <form className="form__profile" id="profile" onSubmit={handleSubmit}>
          <div className="form__container_profile">
            <h2 className="form__heading-profile">{`Привет, ${currentUser.name}!`}</h2>
            <fieldset className="form__inputs">
              <div className="form__input-container-profile">
                <label className="form__field-profile">
                  Имя
                  <input
                    id="profile-name"
                    className={`form__item form__item-profile ${
                      changedName && nameError ? "form__item-profile_error" : ""
                    }`}
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    disabled={!isInputDisabled}
                  />
                </label>
              </div>
              <span className="form__item-profile_error form__profile_span">
                {nameError}
              </span>
              <div className="form__input-container-profile form__input-container_border">
                <label className="form__field-profile">
                  Почта
                  <input
                    id="profile-email"
                    className={`form__item form__item-profile ${
                      changedEmail && emailError
                        ? "form__item-profile_error"
                        : ""
                    }`}
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={!isInputDisabled}
                  />
                </label>
              </div>
              <span className="form__item-profile_error">{emailError}</span>
              <div className="form__handlers">
                <div className="form__item-message">{props.message}</div>
                <button
                  className={`submit__button-profile ${
                    !formValid || name < 2 || email < 2
                      ? "submit__button-profile_disabled"
                      : ""
                  }`}
                  type="submit"
                  disabled={!formValid || name < 2 || email < 2}
                  onClick={changeInputDisabled}
                >
                  Редактировать
                </button>
              </div>
            </fieldset>
            <Link to="/" className="form__exit" onClick={props.onSignOut}>
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Profile;
