import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Polls from './pages/Polls/Polls';
import Poll from './pages/Poll/Poll';
import CreatePoll from './pages/CreatePoll/CreatePoll';

import { UserProvider } from './contexts/UserContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <div className="container col-lg-10 col-md-11 col-sm-12">
          <Route exact path="/" component={Polls} />
          <Route exact path="/polls/:pollId" component={Poll} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/create-poll" component={CreatePoll} />
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
