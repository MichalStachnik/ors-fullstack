import React, { Component, createContext } from 'react';

const initialContext = {
  username: '',
  userId: '',
  token: '',
  expiresIn: '',
  setUser: (user: any) => {},
  getToken: () => '',
  getUsername: () => '',
  getUserId: () => '',
  clearUserData: () => {}
};

export const UserContext = createContext(initialContext);

export class UserProvider extends Component<
  {},
  { username: string; token: string; userId: string; expiresIn: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || '',
      userId: localStorage.getItem('userid') || '',
      expiresIn: ''
    };
  }

  componentDidMount() {
    this.setExpiresIn();
  }

  // Check if the user has logged in in 24 hours
  setExpiresIn = () => {
    const expiresIn = Number(localStorage.getItem('expiresIn'));
    const now = new Date().getTime();
    if (now > expiresIn) {
      this.setState({ expiresIn: '' });
    } else {
      this.setState({ expiresIn: expiresIn.toString() });
    }
    return;
  };

  setUser = (user: any) => {
    const { token, username, userId } = user;
    this.setState({ token, username, userId });
  };

  getToken = () => this.state.token;

  getUsername = () => this.state.username;

  getUserId = () => this.state.userId;

  clearUserData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userid');
    localStorage.removeItem('expiresIn');

    this.setState({
      token: '',
      username: '',
      userId: '',
      expiresIn: ''
    });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          username: this.state.username,
          userId: this.state.userId,
          token: this.state.token,
          expiresIn: this.state.expiresIn,
          setUser: this.setUser,
          getToken: this.getToken,
          getUsername: this.getUsername,
          getUserId: this.getUserId,
          clearUserData: this.clearUserData
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
