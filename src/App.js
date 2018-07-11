import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import HomePage from './pages/User/Home/Home';
import ChallengePage from './pages/User/Challenge/Challenge';
import ProblemsPage from './pages/User/Challenge/Problems';
import ProblemPage from './pages/User/Challenge/Problem';
import LeaderboardPage from './pages/User/Challenge/Leaderboard';
import ProfilePage from './pages/User/Profile/Profile';
import QuestionnairePage from './pages/User/Questionnaire/Questionnaire';
import QuestionnaireLoginPage from './pages/User/Questionnaire/Login';

import AdminHomePage from './pages/Admin/Home/Home';
import NewChallengePage from './pages/Admin/Challenge/NewChallenge';
import NewProblemPage from './pages/Admin/Challenge/NewProblem';
import SubmissionsPage from './pages/Admin/Challenge/Submissions';
import AdminLeaderBoardPage from './pages/Admin/Challenge/Leaderboard';
import AdminLoginPage from './pages/Admin/Login/Login';
import AdminQuestionnairePage from './pages/Admin/Questionnaire/Questionnaire';
import UsersPage from './pages/Admin/Users/Users';
import UserProfilePage from './pages/Admin/Users/Profile';
import QuestionnaireSubmissionsPage from './pages/Admin/Questionnaire/Submissions';
import QuestionnaireSubmissionPage from './pages/Admin/Questionnaire/Submission';

const App = () => (
  <Router>
      <div className="App">
        <Route exact path="/" component={HomePage} />
        <Route path="/challenge" component={ChallengePage} />
        <Route path="/problems" component={ProblemsPage} />
        <Route path="/problem" component={ProblemPage} />
        <Route path="/leaderboard" component={LeaderboardPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route exact path="/questionnaire" component={QuestionnairePage} />
        <Route path="/questionnaire/login" component={QuestionnaireLoginPage} />
        
        <Route exact path="/admin" component={AdminHomePage} />
        <Route path="/admin/newchallenge" component={NewChallengePage} />
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin/newproblem" component={NewProblemPage} />
        <Route path="/admin/submissions" component={SubmissionsPage} />
        <Route path="/admin/leaderboard" component={AdminLeaderBoardPage} />
        <Route exact path="/admin/questionnaire" component={AdminQuestionnairePage} />
        <Route path="/admin/users" component={UsersPage} />
        <Route path="/admin/user/profile" component={UserProfilePage} />
        <Route path="/admin/questionnaire/submissions" component={QuestionnaireSubmissionsPage} />
        <Route path="/admin/questionnaire/submission" component={QuestionnaireSubmissionPage} />
      </div>
  </Router>
  );

export default App;

