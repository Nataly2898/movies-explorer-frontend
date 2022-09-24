import React from "react";
import "./SavedMovies.css";
import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import savedMovies from "../../utils/savedMovies";

const SavedMovies = ({ loggedIn }) => {
  return (
    <main>
      <section className="savedmovies">
        <SearchForm />
        <div className="savedmovies__container">
          <MoviesCardList buttonMore={false} movies={savedMovies} />
        </div>
      </section>
    </main>
  );
};

export default SavedMovies;
