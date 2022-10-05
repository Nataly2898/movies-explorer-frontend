import MoviesCard from "../MoviesCard/MoviesCard";
import { useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../../contexts/CurrentUserContext";
import "./MoviesCardList.css";
import { useContext } from "react";

const MoviesCardList = ({ movies = [], onSave, savedMovies, onRemove }) => {
  const { pathname } = useLocation();
  const { _id } = useContext(CurrentUserContext);
  const savedViewMovies = pathname === "/saved-movies";

  const contentsMovies = movies.map((movie, index) => (
    <MoviesCard
      onRemove={onRemove}
      savedMovies={savedMovies}
      userId={_id}
      onSave={onSave}
      key={`${movie.id}${index}`}
      movie={movie}
      savedViewMovies={savedViewMovies}
      saved={savedMovies.some((i) => +i.movieId === +movie.id)}
    />
  ));

  return (
    <section className="movies-card">
      <ul className="movies-card__list">{contentsMovies}</ul>
    </section>
  );
};

export default MoviesCardList;
