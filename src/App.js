import React from "react";
import "./App.css";
import { Regex } from "./regex/Regex";
import { BrowserRouter, Switch, Route, NavLink } from "react-router-dom";
import { IssueToBranchName } from "./converters/IssueToBranchName";
import { DictionaryReplace } from "./replacing/DictionaryReplace";
import { Dictionary } from "./replacing/dictionary/Dictionary";

function App() {
  return (
    <BrowserRouter>
      <nav className="menu">
        <NavLink to="/dictionary-replace" activeClassName="selected-menu-item">
          Dictionary Replace
        </NavLink>
        <NavLink to="/regex" activeClassName="selected-menu-item">
          Regex
        </NavLink>
        <NavLink to="/converters" activeClassName="selected-menu-item">
          Converters
        </NavLink>
      </nav>
      <Switch>
        <Route path="/dictionary-replace">
          <DictionaryReplace />
        </Route>
        <Route path="/dictionary">
          <Dictionary />
        </Route>
        <Route path="/regex">
          <Regex />
        </Route>
        <Route path="/converters">
          <IssueToBranchName />
        </Route>
      </Switch>
      <footer>
        <span className="about">
          <a href="https://github.com/hoaftq">dev-utilities</a>
        </span>
      </footer>
    </BrowserRouter>
  );
}

export default App;
