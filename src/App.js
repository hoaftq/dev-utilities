import React from "react";
import { Regex } from "./regex/Regex";
import { BrowserRouter, Route, NavLink, Routes } from "react-router-dom";
import { IssueToBranchName } from "./converters/IssueToBranchName";
import { DictionaryReplace } from "./replacing/DictionaryReplace";
import { Dictionary } from "./replacing/dictionary/Dictionary";
import styles from "./App.module.css";

function App() {
  const activeClassName = ({ isActive }) => {
    return isActive ? styles["selected-menu-item"] : "";
  };
  return (
    <BrowserRouter>
      <nav className={styles.menu}>
        <NavLink to="/dictionary-replace" className={activeClassName}>
          Dictionary Replace
        </NavLink>
        <NavLink to="/regex" className={activeClassName}>
          Regex
        </NavLink>
        <NavLink to="/converters" className={activeClassName}>
          Converters
        </NavLink>
      </nav>
      <Routes>
        <Route path="/dictionary-replace" element={<DictionaryReplace />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/regex" element={<Regex />} />
        <Route path="/converters" element={<IssueToBranchName />} />
      </Routes>
      <footer className={styles.footer}>
        <span className={styles.about}>
          <a href="https://github.com/hoaftq/dev-utilities">dev-utilities</a>
        </span>
      </footer>
    </BrowserRouter>
  );
}

export default App;
