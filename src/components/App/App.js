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
  profileSuccessful,
  deleteMovies,
  deleteErrorMovies
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      handleSignOut()

      console.log(serverError);
    } finally {
      setIsLoading(false);
    }
  };

  //?????????????????? ??????????????
  const fetchMovies = async () => {
    try {
      const localMovies = JSON.parse(localStorage.getItem('preloadMovies'))
      if (localMovies) {
        setPreloadMovies(localMovies)

        return localMovies
      }

      const movies = await MoviesApi.getMovies();

      localStorage.setItem('preloadMovies', JSON.stringify(movies))

      setPreloadMovies(movies)

      return movies

    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  // ??????????
  const handleSearch = async (searchValue, isShort) => {
    try {
      clearError();
      setIsLoading(true);

      let movies = preloadMovies

      if (!movies || !movies.length) {
        movies = await fetchMovies()
      }

      const filteredMovies = filterMovies(searchValue, movies, isShort);
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

  //???????????????????? ?? ???????????????? ??????????????
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
      openPopup(deleteMovies);
    } catch (error) {
      console.log(deleteErrorMovies);
    }
  };

  // ?????????????????????? ?? ?????????????????????? ??????????????
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
          MainApi.updateToken(token);
          setLoggedIn(true);
          tokenCheck();
          history.push("/movies");
        }
      })
      .catch((error) => {
        setPopupTitle(authError);
        setIsOpenPopupError(true);
      });
  };

  // ???????????????????????????? ??????????????
  const handleUpdateUser = async (values) => {
    try {
      const response = await MainApi.updateUserInfo(values);
      setCurrentUser((user) => ({
        ...user,
        ...response,
      }));
      openPopup(profileSuccessful);
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

  // ??????????
  function handleSignOut() {
    Token.remove();
    setLoggedIn(false);
    setCurrentUser({});
    localStorage.clear();
    setMovies([]);
    localStorage.removeItem("currentUser");
    history.push("/");
  }

  function handleBack() {
    history.goBack()
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
            searchLocal={localStorage.getItem('search')}
            shortLocal={localStorage.getItem('isShort')}
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
            <NotFoundPage
              back={handleBack} 
            />
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
