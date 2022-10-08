import { useEffect, useState } from "react";
import Header from "../Header/Header";
import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import Footer from "../Footer/Footer";
import "./Movies.css";
import {
  MAX_NUMBER_OF_SCREEN,
  MID_NUMBER_OF_SCREEN,
  MIN_NUMBER_OF_SCREEN,
  MIN_NUMBER_ROW,
  MID_NUMBER_ROW,
  MAX_NUMBER_ROW,
  MAX_NUMBER_MOVIES,
  MAX_NUMBER_MOVIE,
  MID_NUMBER_MOVIE,
  MIN_NUMBER_MOVIE,
} from "../../utils/constans";

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
  searchLocal,
  shortLocal
}) => {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [rowMovies, setRowMovies] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [numberMovies, setNumberMovies] = useState(null);

  useEffect(() => {
    let rtime;
    let isTimeout = false;
    let delta = 200;
    let timeout = null

    const resizeEvent = () => {
      rtime = new Date();
      if (isTimeout === false) {
        isTimeout = true;
        setTimeout(resizeAction, delta);
      }
    };

    window.addEventListener("resize", resizeEvent);

    const resizeAction = () => {
      if (new Date() - rtime < delta) {
        clearTimeout(timeout)

        timeout = setTimeout(resizeAction, delta);
      } else {
        isTimeout = false;
        setScreenWidth(window.screen.width);
      }
    };
    return () => {
      window.removeEventListener("resize", resizeEvent);
    };
  }, []);

  const homeScreen = (screenWidth) => {
    if (screenWidth > MAX_NUMBER_OF_SCREEN) {
      setRowMovies(MAX_NUMBER_ROW);
      setNumberMovies(MAX_NUMBER_MOVIES);
    } else if (
      screenWidth >= MID_NUMBER_OF_SCREEN &&
      screenWidth <= MAX_NUMBER_OF_SCREEN
    ) {
      setRowMovies(MID_NUMBER_ROW);
      setNumberMovies(MAX_NUMBER_MOVIE);
    } else if (
      screenWidth >= MIN_NUMBER_OF_SCREEN &&
      screenWidth <= MID_NUMBER_OF_SCREEN
    ) {
      setRowMovies(MIN_NUMBER_ROW);
      setNumberMovies(MID_NUMBER_MOVIE);
    } else {
      setRowMovies(MIN_NUMBER_ROW);
      setNumberMovies(MIN_NUMBER_MOVIE);
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
            searchLocal={searchLocal}
            shortLocal={shortLocal}
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
