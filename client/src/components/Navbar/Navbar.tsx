import React from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import './Navbar.css';

interface Props {}

interface State {}

class Navbar extends React.Component<Props, State> {
  static contextType = UserContext;
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    let usr = this.context.getUser();
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand" href="#">
          OneRandomSample
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink exact to="/" className="nav-link">
                Polls
              </NavLink>
            </li>
            {usr === undefined ? (
              ''
            ) : (
              <li className="nav-item">
                <NavLink exact to="/create-poll" className="nav-link">
                  Create Poll
                </NavLink>
              </li>
            )}
            {usr === undefined ? (
              <li className="nav-item">
                <NavLink exact to="/register" className="nav-link">
                  Register
                </NavLink>
              </li>
            ) : (
              ''
            )}
            {usr === undefined ? (
              <li className="nav-item">
                <NavLink exact to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
            ) : (
              ''
            )}
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
            />
            <button className="btn btn-outline-info my-2 my-sm-0" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
