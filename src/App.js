import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import HomePage from './pages/User/Home/Home'

const App = () => (
  <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />
      </div>
  </Router>
  );

export default App;

