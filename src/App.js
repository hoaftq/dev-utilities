import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NewItem, SearchItems } from './replacing/Item';
import { Regex } from './regex/Regex';
import { BrowserRouter, Switch, Link, Route, NavLink } from 'react-router-dom';
import { Dictionary } from './replacing/Dictionary';

function App() {
  return (
    <BrowserRouter>
      <nav className="menu">
        <NavLink to="/dictionary-replace" activeClassName="selected-menu-item">Dictionary Replace</NavLink>
        <NavLink to="/regex" activeClassName="selected-menu-item">Regex</NavLink>
      </nav>
      <Switch>
        <Route path="/dictionary-replace">
          <Dictionary />
        </Route>
        <Route path="/regex">
          <Regex />
        </Route>
      </Switch>
      <footer>
        <span className="about">
          Developed by <a href="https://github.com/hoaftq">hoaftq</a>
        </span>
      </footer>
    </BrowserRouter>
  );
}

export default App;
