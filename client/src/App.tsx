import React, { useState } from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HashRouter as Router, Route } from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Ad from './components/Ad/Ad';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Polls from './pages/Polls/Polls';
import Poll from './pages/Poll/Poll';
import CreatePoll from './pages/CreatePoll/CreatePoll';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import NewPassword from './pages/NewPassword/NewPassword';

import { UserProvider } from './contexts/UserContext';

const App: React.FC = () => {
  let [searchValue, setSearchValue] = useState('');

  const inputChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  const inputClearHandler = () => {
    setSearchValue('');
  };

  return (
    <UserProvider>
      <Router>
        <Navbar
          searchValue={searchValue}
          onInputChanged={inputChangeHandler}
          onInputCleared={inputClearHandler}
        />
        <div className="container col-lg-10 col-md-11 col-sm-12">
          <Route exact path="/">
            <Polls searchValue={searchValue} />
          </Route>
          <Route exact path="/polls/:pollId" component={Poll} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/create-poll" component={CreatePoll} />
          <Route exact path="/forgot-password" component={ForgotPassword} />
          <Route
            exact
            path="/new-password/:emailToken"
            component={NewPassword}
          />
          <Route exact path="/contact">
            <div>im a contact component</div>
          </Route>
        </div>
      </Router>
      {/* <Ad /> */}
      {/* <Footer /> */}
    </UserProvider>
  );
};

export default App;
