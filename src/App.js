import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import HomePage from './pages/User/Home/Home';
import ChallengePage from './pages/User/Challenge/Challenge';
import ProblemsPage from './pages/User/Challenge/Problems';
import ProblemPage from './pages/User/Challenge/Problem';
import LeaderboardPage from './pages/User/Challenge/Leaderboard';
import ProfilePage from './pages/User/Profile/Profile';
import OnlineTestPage from './pages/User/OnlineTest/OnlineTest';

import AdminHomePage from './pages/Admin/Home/Home';
import NewChallengePage from './pages/Admin/Challenge/NewChallenge';
import NewProblemPage from './pages/Admin/Challenge/NewProblem';
import SubmissionsPage from './pages/Admin/Challenge/Submissions';
import AdminLeaderBoardPage from './pages/Admin/Challenge/Leaderboard';
import AdminLoginPage from './pages/Admin/Login/Login';

const App = () => (
  <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route path="/challenge" component={ChallengePage} />
        <Route path="/problems" component={ProblemsPage} />
        <Route path="/problem" component={ProblemPage} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/onlinetest" component={OnlineTestPage} />
        
        <Route exact path="/admin" component={AdminHomePage} />
        <Route path="/newchallenge" component={NewChallengePage} />
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/newproblem" component={NewProblemPage} />
        <Route path="/submissions" component={SubmissionsPage} />
        <Route path="/admin/leaderboard" component={AdminLeaderBoardPage} />
      </div>
  </Router>
  );

export default App;

