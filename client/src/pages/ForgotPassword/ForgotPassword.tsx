import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { UserContext } from '../../contexts/UserContext';

import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log('what we are sending from FE', email);
    let payload = {
      email
    };

    try {
      const res = await fetch('/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log('data', data);
      //   userContext.setUser(data);
      //   history.push('/');
    } catch (error) {
      console.log('error sending forget password');
      console.error(error.message);
      throw error;
    }
  };

  return (
    <div className="my-3">
      <Link to="/">
        <button type="button" className="btn btn-outline-secondary">
          Back
        </button>
      </Link>
      <form className="my-3" onSubmit={evt => onSubmit(evt)}>
        <fieldset>
          <legend>Forgot Password</legend>
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
          </div>
          <button type="submit" className="btn btn-primary">
            Send Link
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ForgotPassword;
