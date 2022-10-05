import { moviesDate } from "../../../utils/moviesDate";
import { imageFormat } from "../../../utils/moviesImage";
import "./MoviesCard.css";

const MoviesCard = ({
  movie,
  savedViewMovies,
  onSave,
  userId,
  savedMovies,
  onRemove,
  saved,
}) => {
  const { nameRU, image, duration, id, trailerLink } = movie;
  const formatedDuration = moviesDate(duration);
  const formatedImgSrc = imageFormat(image);

  const handleMovieAction = (e) => {
    e.stopPropagation();
    if (saved) {
      const foundMovie = savedMovies.find((movie) => +movie.movieId === +id);
      if (foundMovie) {
        onRemove(foundMovie._id);
      }
    } else {
      onSave(movie, userId);
    }
  };

  const handleRemoveMovie = (e) => {
    e.stopPropagation();
    onRemove(movie._id);
  };

  const handleMovieClick = () => {
    if (trailerLink) {
      window.open(trailerLink, "_blank");
    }
  };

  const cardButton = savedViewMovies ? (
    <button
      onClick={handleRemoveMovie}
      className="movies__button movies__button_type_delete"
    ></button>
  ) : (
    <button
      onClick={handleMovieAction}
      className={`movies__button movies__button_type_save ${
        saved && "movies__button_type_save-active"
      }`}
    ></button>
  );

  return (
    <li onClick={handleMovieClick} className="movie__card">
      <img className="movie__image" src={formatedImgSrc} alt={nameRU} />
      <div className="movie__description">
        <h3 className="movie__name">{nameRU}</h3>
        {cardButton}
      </div>
      <p className="movie__duration">{formatedDuration}</p>
    </li>
  );
};

export default MoviesCard;
