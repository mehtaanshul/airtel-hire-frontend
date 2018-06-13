import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import HomePage from './pages/User/Home/Home';
import ChallengePage from './pages/User/Challenge/Challenge';
import ProblemsPage from './pages/User/Challenge/Problems';
import ProblemPage from './pages/User/Challenge/Problem';

const App = () => (
  <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route exact path="/challenge" component={ChallengePage} />
        <Route exact path="/problems" component={ProblemsPage} />
        <Route exact path="/problem" component={ProblemPage} />
      </div>
  </Router>
  );

export default App;

