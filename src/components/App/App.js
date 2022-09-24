import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

function App() {
  // eslint-disable-next-line
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="page">
      <Switch>
        <Route exact path="/">
          <Header />
          <Main loggedIn={isLoggedIn} />
          <Footer />
        </Route>
        <Route exact path="/movies">
          <Header loggedIn={isLoggedIn} />
          <Movies />
          <Footer />
        </Route>
        <Route exact path="/saved-movies">
          <Header loggedIn={isLoggedIn} />
          <SavedMovies />
          <Footer />
        </Route>
        <Route exact path="/profile">
          <Header loggedIn={isLoggedIn} />
          <Profile />
        </Route>
        <Route exact path="/signup">
          <Register />
        </Route>
        <Route exact path="/signin">
          <Login />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
