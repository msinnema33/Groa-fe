import React from 'react';
//mport logo from './logo.svg';
import './App.css';

import './components/auth/login.scss'
import Login from './components/auth/login'


function App() {
  return (
    <div className="App2">
     
      <Login/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
