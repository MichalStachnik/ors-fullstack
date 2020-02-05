import React, { Component, createContext } from 'react';

const initialContext = {
  username: '',
  token: '',
  setUser: (user: any) => {},
  getToken: () => '',
  getUsername: () => ''
};

export const UserContext = createContext(initialContext);

export class UserProvider extends Component<
  {},
  { username: string; token: string }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      token: localStorage.getItem('token') || '',
      username: localStorage.getItem('username') || ''
    };
  }

  setUser = (user: any) => {
    const { token, username } = user;
    this.setState({ token, username });
  };

  getToken = () => this.state.token;

  getUsername = () => this.state.username;

  render() {
    return (
      <UserContext.Provider
        value={{
          username: this.state.username,
          token: this.state.token,
          setUser: this.setUser,
          getToken: this.getToken,
          getUsername: this.getUsername
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
