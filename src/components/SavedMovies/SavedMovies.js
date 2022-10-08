import { useEffect, useState } from "react";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";
import { filterMovies } from "../../utils/filterMovies";
import Footer from "../Footer/Footer";
import "./SavedMovies.css";

const SavedMovies = ({ savedMovies, onRemove }) => {
  const [shownMovies, setShownMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    setShownMovies(savedMovies);
  }, [savedMovies]);

  const onSearch = (search, isShort) => {
    const movies = JSON.parse(localStorage.getItem("savedMovies"));

    const filteredMovies = filterMovies(search, movies, isShort);
    if (!filteredMovies.length) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setShownMovies(filteredMovies);
  };

  return (
    <>
      <Header />
      <main className="main">
        <section className="container saved-movies">
          <SearchForm onSearch={onSearch} shortLocal={false} searchLocal={''} />
          <MoviesCardList
            onRemove={onRemove}
            savedMovies={savedMovies}
            movies={shownMovies}
          />
          {noResults && <p className="movies__notfound">Ничего не найдено</p>}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SavedMovies;
