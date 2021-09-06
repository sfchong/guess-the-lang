import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import DataPage from "./pages/data";
import Home from "./pages/home";
import Game from "./pages/game";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import ResultPage from "./pages/result";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <main className="App">
      <Helmet>
        <title>Guess the Lang | Hello World!</title>
      </Helmet>
      <Switch>
        <Route path="/game">
          <Game />
        </Route>
        <Route path="/result">
          <ResultPage />
        </Route>
        <Route path="/data">
          <DataPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </main>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
