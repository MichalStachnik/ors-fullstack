import React from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import './Navbar.css';

interface Props {
  onInputChanged: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onInputCleared: () => void;
  searchValue: string;
}

interface State {
  isInputFocued: boolean;
}

class Navbar extends React.Component<Props, State> {
  static contextType = UserContext;
  constructor(props: Props) {
    super(props);
    this.state = {
      isInputFocued: false
    };
  }

  handleInputFocus = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ isInputFocued: true });
  };

  handleClearClick = () => {
    this.props.onInputCleared();
    this.setState({ isInputFocued: false });
  };

  render() {
    let token = this.context.getToken();
    let username = this.context.getUsername();
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="brand-container">
          <a className="navbar-brand" href="#">
            OneRandomSample
          </a>
          <small className="text-muted">a small polling application</small>
        </div>
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
                value={this.props.searchValue}
                onChange={(evt: any) => this.props.onInputChanged(evt)}
                onFocus={(evt: any) => this.handleInputFocus(evt)}
              />
              {this.state.isInputFocued && (
                <i className="fa fa-times" onClick={this.handleClearClick}></i>
              )}
            </div>
            <button
              className="btn btn-outline-primary my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

export default Navbar;
