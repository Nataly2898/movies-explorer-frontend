import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Popup from "../Popup/Popup";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Movies/Preloader/Preloader";
import { filterMovies } from "../../utils/filterMovies";
import MoviesApi from "../../utils/MoviesApi";
import MainApi from "../../utils/MainApi";
import Token from "../../utils/token";
import {
  serverError,
  registerSuccessful,
  registerError,
  authError,
} from "../../utils/constans";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPopupError, setIsOpenPopupError] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");

  const [preloadMovies, setPreloadMovies] = useState([])
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const clearError = () => {
    setError("");
  };

  useEffect(() => {
    tokenCheck();
  }, [history]);

  const tokenCheck = async () => {
    try {
      const userData = await MainApi.getUserInfo();
      setLoggedIn(true);
      setCurrentUser((user) => ({
        ...user,
        ...userData,
      }));
    } catch (err) {
      console.log(serverError);
    } finally {
      setIsLoading(false);
    }
  };

  //Получение фильмов
  const fetchMovies = async () => {
    try {
      const movies = await MoviesApi.getMovies();

      setPreloadMovies(movies)
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  // Поиск
  const handleSearch = async (searchValue, isShort) => {
    try {
      clearError();
      setIsLoading(true);

      if (!preloadMovies.length) await fetchMovies()

      const filteredMovies = filterMovies(searchValue, preloadMovies, isShort);
      setMovies(filteredMovies);
      localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
      localStorage.setItem("search", searchValue);
      localStorage.setItem("isShort", isShort);
      if (!filteredMovies.length) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.getItem("filteredMovies") &&
      setMovies(JSON.parse(localStorage.getItem("filteredMovies")));
  }, []);

  useEffect(() => {
    const getSavedMovies = async () => {
      const response = await MainApi.getMovies();
      setSavedMovies(response);
      localStorage.setItem("savedMovies", JSON.stringify(response));
    };
    if (loggedIn) {
      try {
        getSavedMovies();
      } catch (error) {
        console.log(error);
      }
    }
  }, [loggedIn]);

  //Сохранение и удаление фильмов
  const handleSaveMovie = async (movie) => {
    clearError();
    try {
      const response = await MainApi.saveMovies(movie);
      const tmpSavedMovies = [...savedMovies, response];
      setSavedMovies(tmpSavedMovies);
      localStorage.setItem("savedMovies", JSON.stringify(tmpSavedMovies));
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleRemoveMovie = async (movieId) => {
    try {
      await MainApi.deleteMovies(movieId);
      const filteredMovies = savedMovies.filter((item) => item._id !== movieId);
      setSavedMovies(filteredMovies);
      localStorage.setItem("savedMovies", JSON.stringify(filteredMovies));
    } catch (error) {
      console.log(error);
    }
  };

  // Регистрация и Авторизация профиля
  const handleRegister = (formData) => {
    MainApi.register(formData)
      .then((res) => {
        if (res._id) {
          setPopupTitle(registerSuccessful);
          setIsOpenPopupError(true);
          handleLogin(formData);
        }
      })
      .catch((err) => {
        setPopupTitle(registerError);
        setIsOpenPopupError(true);
      });
  };

  const handleLogin = (formData) => {
    MainApi.login(formData)
      .then(({ token }) => {
        if (token) {
          Token.save(token);
          MainApi.updateToken();
          setLoggedIn(true);
          tokenCheck();
          history.push("/movies");
        }
      })
      .catch((err) => {
        setPopupTitle(authError);
        setIsOpenPopupError(true);
      });
  };

  // Редактирование профиля
  const handleUpdateUser = async (values) => {
    try {
      const response = await MainApi.updateUserInfo(values);
      setCurrentUser((user) => ({
        ...user,
        ...response,
      }));

    } catch (error) {
      console.log(error);
    }
  };

  function openPopup(textError) {
    setPopupTitle(textError);
    setIsOpenPopupError(true);
  }

  function closePopup() {
    setIsOpenPopupError(false);
    setPopupTitle("");
  }

  useEffect(() => {
    if (setIsOpenPopupError) {
      function handleEsc(evt) {
        if (evt.key === "Escape") {
          closePopup();
        }
      }
      document.addEventListener("keydown", handleEsc);
      return () => {
        document.removeEventListener("keydown", handleEsc);
      };
    }
  }, [isOpenPopupError]);

  // Выход
  function handleSignOut() {
    Token.remove();
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    setMovies([]);
    localStorage.removeItem("currentUser");
    history.push("/");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route exact path="/">
            <Main loggedIn={loggedIn} />
          </Route>

          <ProtectedRoute
            path="/movies"
            loggedIn={loggedIn}
            component={Movies}
            movies={movies}
            isLoading={isLoading}
            openPopup={openPopup}
            onSearch={handleSearch}
            error={error}
            onSave={handleSaveMovie}
            onRemove={handleRemoveMovie}
            savedMovies={savedMovies}
            noResults={noResults}
            clearError={clearError}
          />

          <ProtectedRoute
            path="/saved-movies"
            loggedIn={loggedIn}
            component={SavedMovies}
            savedMovies={savedMovies}
            isLoading={isLoading}
            onRemove={handleRemoveMovie}
          />
          <ProtectedRoute
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            isLoading={isLoading}
            onSignOut={handleSignOut}
            openPopup={openPopup}
            onEditUser={handleUpdateUser}
          />

          <Route exact path="/signup">
            {() =>
              isLoading ? (
                <Preloader />
              ) : !loggedIn ? (
                <Register onRegister={handleRegister} />
              ) : (
                <Redirect to="/movies" />
              )
            }
          </Route>
          <Route exact path="/signin">
            {() =>
              isLoading ? (
                <Preloader />
              ) : !loggedIn ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Redirect to="/movies" />
              )
            }
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <Popup
          text={popupTitle}
          isOpen={isOpenPopupError}
          onClose={closePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
