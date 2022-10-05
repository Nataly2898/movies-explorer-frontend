import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import Footer from "../Footer/Footer";
import "./Movies.css";

const Movies = ({
  onSearch,
  movies,
  isLoading,
  error,
  onSave,
  onRemove,
  savedMovies,
  noResults,
  clearError,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [rowMovies, setRowMovies] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [numberMovies, setNumberMovies] = useState(null);

  useEffect(() => {
    let rtime;
    let timeout = false;
    let delta = 200;

    const resizeEvent = () => {
      rtime = new Date();
      if (timeout === false) {
        timeout = true;
        setTimeout(resizeAction, delta);
      }
    };

    window.addEventListener("resize", resizeEvent);

    const resizeAction = () => {
      if (new Date() - rtime < delta) {
        setTimeout(resizeAction, delta);
      } else {
        timeout = false;
        setScreenWidth(window.screen.width);
      }
    };
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  const homeScreen = (screenWidth) => {
    if (screenWidth > 1100) {
      setRowMovies(4);
      setNumberMovies(16);
    } else if (screenWidth >= 768 && screenWidth <= 1100) {
      setRowMovies(2);
      setNumberMovies(8);
    } else {
      setRowMovies(2);
      setNumberMovies(5);
    }
  };

  useEffect(() => {
    homeScreen(screenWidth);
  }, [screenWidth]);

  useEffect(() => {
    setShownMovies(movies.slice(0, numberMovies));
  }, [numberMovies, movies]);

  const handleMoreMovies = () => {
    setNumberMovies((prevValue) => (prevValue += rowMovies));
  };

  const handleSearch = (search, isShort) => {
    homeScreen(screenWidth);
    onSearch(search, isShort);
  };

  const handleClearError = () => {
    clearError();
  };

  return (
    <>
      <Header />
      <main className="main">
        <div className="movies container">
          <SearchForm
            onSearch={handleSearch}
            cacheValue={localStorage.getItem("search")}
          />
          {!isLoading && noResults && (
            <p className="movies__notfound">Ничего не найдено</p>
          )}
          {isLoading ? (
            <div className="movies__preloader">
              <Preloader />
            </div>
          ) : (
            <MoviesCardList
              movies={shownMovies}
              onSave={onSave}
              savedMovies={savedMovies}
              onRemove={onRemove}
            />
          )}

          {shownMovies.length < movies.length && (
            <button onClick={handleMoreMovies} className="movies__more">
              Еще
            </button>
          )}
          {error && (
            <div className="movies__error">
              Что-то пошло не так... {error}
              <span className="form__error-close" onClick={handleClearError}>
                <div></div>
                <div></div>
              </span>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
