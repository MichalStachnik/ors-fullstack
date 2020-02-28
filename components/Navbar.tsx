import React, { useContext } from 'react';
import Link from 'next/link';

// import { UserContext } from '../../contexts/UserContext';

interface Props {
  onInputChanged: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onInputCleared: () => void;
  searchValue: string;
}

const Navbar: React.FC<Props> = (props: Props) => {
  //   const userContext = useContext(UserContext);

  //   const token = userContext.getToken();
  //   const username = userContext.getUsername();

  const handleClearClick = () => {
    props.onInputCleared();
  };

  const handleLogout = () => {
    // userContext.clearUserData();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="brand-container">
        <Link href="/">
          <a title="One Random Sample" className="navbar-brand">
            One Random Sample
          </a>
        </Link>
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
            <Link href="/">
              <a title="Polls" className="nav-link">
                Polls
              </a>
            </Link>
          </li>
          {'' === '' ? (
            ''
          ) : (
            <li className="nav-item">
              <Link href="/create-poll">
                <a title="Create Poll" className="nav-link">
                  Create Poll
                </a>
              </Link>
            </li>
          )}
          {'' === '' ? (
            <li className="nav-item">
              <Link href="/register">
                <a title="Register" className="nav-link">
                  Register
                </a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {'' === '' ? (
            <li className="nav-item">
              <Link href="/login">
                <a title="Login" className="nav-link">
                  Login
                </a>
              </Link>
            </li>
          ) : (
            ''
          )}
          {'' && (
            <li className="nav-item" onClick={() => handleLogout()}>
              <span className="nav-link logout">Logout</span>
            </li>
          )}
        </ul>
        {'' && (
          <h6 className="username">
            {/* Welcome back <span>{username}</span> */}
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
      <style jsx>{`
        .brand-container {
          display: flex;
          flex-direction: column;
        }

        .navbar-brand {
          font-size: 20px;
        }

        .input-container {
          position: relative;
        }

        .fa-times {
          cursor: pointer;
          color: var(--danger);
          position: absolute;
          right: 15px;
          top: 20.5px;
        }

        .username {
          color: var(--light);
        }

        .username span {
          color: var(--primary);
        }

        .logout {
          cursor: pointer;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
