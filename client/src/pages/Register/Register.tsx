import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Register.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });

  const { username, email, password, password2 } = formData;

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (password !== password2) return;

    const newUser = {
      username,
      email,
      password
    };

    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      const data = await res.json();
      console.log('data:', data);
    } catch (error) {
      console.log('error registering user');
      console.error(error.message);
      throw error;
    }
  };

  const isSubmitDisabled =
    username.length === 0 ||
    email.length === 0 ||
    password.length === 0 ||
    password2.length === 0;

  return (
    <div className="my-3 text-white">
      <Link to="/">
        <button type="button" className="btn btn-outline-secondary">
          Back
        </button>
      </Link>
      <form
        className="my-3 my-3 p-5 container col-lg-8 border-primary card bg-dark"
        onSubmit={evt => onSubmit(evt)}
      >
        <fieldset>
          <legend>Sign Up</legend>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Enter username"
              required
              name="username"
              value={username}
              onChange={evt => onChange(evt)}
            />
          </div>
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
          <div className="form-group ">
            <label htmlFor="exampleInputPassword1">Confirm password</label>
            <input
              type="password"
              className={`form-control ${
                password.length && password !== password2 ? 'is-invalid' : ''
              } 
                ${
                  password === password2 && password.length > 0
                    ? 'is-valid'
                    : ''
                }
              `}
              id="exampleInputPassword2"
              placeholder="Password"
              required
              name="password2"
              value={password2}
              onChange={evt => onChange(evt)}
            />
            <div className="invalid-feedback">Passwords do not match.</div>
            <div className="valid-feedback">Well done, passwords match.</div>
          </div>
          <button
            type="submit"
            className="btn btn-primary float-right mt-4"
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
