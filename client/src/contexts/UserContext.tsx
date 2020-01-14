import React, { Component, createContext } from 'react';

const initialContext = {
  user: undefined,
  setUser: (user: any) => {},
  getUser: () => {}
};

export const UserContext = createContext(initialContext);

export class UserProvider extends Component<{}, { user: any }> {
  constructor(props: any) {
    super(props);
    this.state = { user: undefined };
  }

  getUser = () => this.state.user;

  setUser = (user: any) => {
    this.setState({ user });
    console.log('set user called with', user);
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          setUser: this.setUser,
          getUser: this.getUser
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
