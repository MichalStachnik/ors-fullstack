// import React from 'react';

// import './CreatePoll.css';

// interface Props {}

// interface State {}

// class CreatePoll extends React.Component<Props, State> {
//   constructor(props: Props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount = async () => {};

//   componentDidUpdate = async () => {};

//   render() {
//     return <div>im a create poll page</div>;
//   }
// }

// export default CreatePoll;

import React, { useState, useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

import './CreatePoll.css';

const CreatePoll: React.FC = () => {
  const userContext = useContext(UserContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  console.log('userContext in CreatePoll', userContext);

  const { email, password } = formData;

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    console.log(formData);

    const credentials = {
      email,
      password
    };

    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      console.log('successful post');
      console.log(res);

      const data = await res.json();
      console.log('data:', data);

      // context.changeSearchValue('');
      userContext.setUser(data.token);
    } catch (error) {
      console.log('error registering user');
      console.error(error.message);
      throw error;
    }
  };

  return (
    <div className="my-3">
      <form className="my-3" onSubmit={evt => onSubmit(evt)}>
        <fieldset>
          <legend>Login</legend>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
              name="email"
              value={email}
              onChange={evt => onChange(evt)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
              name="password"
              value={password}
              onChange={evt => onChange(evt)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePoll;
