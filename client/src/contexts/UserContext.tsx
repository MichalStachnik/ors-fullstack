import React, { Component, createContext } from 'react';

const initialContext = {
  username: '',
  userId: '',
  token: '',
  setUser: (user: any) => {},
  getToken: () => '',
  getUsername: () => '',
  getUserId: () => ''
};

export const UserContext = createContext(initialContext);

export class UserProvider extends Component<
  {},
  { username: string; token: string; userId: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || '',
      userId: localStorage.getItem('userid') || ''
    };
  }

  setUser = (user: any) => {
    const { token, username, userId } = user;
    this.setState({ token, username, userId });
  };

  getToken = () => this.state.token;

  getUsername = () => this.state.username;

  getUserId = () => {
    console.log('in context getting userId', this.state.userId);
    return this.state.userId;
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          username: this.state.username,
          userId: this.state.userId,
          token: this.state.token,
          setUser: this.setUser,
          getToken: this.getToken,
          getUsername: this.getUsername,
          getUserId: this.getUserId
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
