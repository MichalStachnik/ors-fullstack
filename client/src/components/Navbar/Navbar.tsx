import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import './Navbar.css';

interface Props {
  onInputChanged: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onInputCleared: () => void;
  searchValue: string;
}

const Navbar: React.FC<Props> = (props: Props) => {
  const userContext = useContext(UserContext);

  const token = userContext.getToken();
  const username = userContext.getUsername();

  const handleClearClick = () => {
    props.onInputCleared();
  };

  const handleLogout = () => {
    userContext.clearUserData();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="brand-container">
        <NavLink exact to="/" className="navbar-brand">
          One Random Sample
        </NavLink>
        <small className="text-primary ml-2">
          a free minimalistic polling application
        </small>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link">
              Polls
            </NavLink>
          </li>
          {token === '' ? (
            ''
          ) : (
            <li className="nav-item">
              <NavLink exact to="/create-poll" className="nav-link">
                Create Poll
              </NavLink>
            </li>
          )}
          {token === '' ? (
            <li className="nav-item">
              <NavLink exact to="/register" className="nav-link">
                Register
              </NavLink>
            </li>
          ) : (
            ''
          )}
          {token === '' ? (
            <li className="nav-item">
              <NavLink exact to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          ) : (
            ''
          )}
          {token && (
            <li className="nav-item" onClick={() => handleLogout()}>
              <span className="nav-link logout">Logout</span>
            </li>
          )}
        </ul>
        {username && (
          <h6 className="username">
            Welcome back <span>{username}</span>
          </h6>
        )}
        <form className="form-inline my-2 my-lg-0">
          <div className="input-container">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              value={props.searchValue}
              onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
                props.onInputChanged(evt)
              }
            />
            {props.searchValue.length > 0 && (
              <i className="fa fa-times" onClick={handleClearClick}></i>
            )}
          </div>
          {/* TODO: Hit BE with submit button */}
          {/* <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button> */}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
