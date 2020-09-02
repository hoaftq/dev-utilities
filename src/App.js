import React from 'react';
import logo from './logo.svg';
import './App.css';
import { NewItem, SearchItems } from './replacing/Item';
import { Regex } from './regex/Regex';

function App() {
  return (
    <div>
      {/* <SearchItems />
      <NewItem /> */}
      <Regex />
    </div>
  );
}

export default App;
