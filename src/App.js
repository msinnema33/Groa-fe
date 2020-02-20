import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Dashboard from './components/dashboard/index.js';
// import Login from './auth/Login'; 
// import Register from './auth/Register'; 

import './App.css';

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Dashboard} /> 
      {/* <Route path='/login' component = {Login}/>
      <Route path='/register' component = {Register}/> */}


    </div>
  );
}

export default App;
