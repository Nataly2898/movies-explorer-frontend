import React from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import movies from "../../utils/Movies";

const Movies = ({ loggedIn }) => {
  return (
    <main>
      <section className="movies">
        <SearchForm />
        <MoviesCardList buttonMore={true} movies={movies} />
      </section>
    </main>
  );
};

export default Movies;
