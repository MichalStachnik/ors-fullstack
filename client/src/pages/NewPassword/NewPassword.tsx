import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './NewPassword.css';

const NewPassword: React.FC = (props: any) => {
  const [formData, setFormData] = useState({
    password: '',
    buttonDisabled: true,
    emailToken: ''
  });

  let history = useHistory();

  const { password, buttonDisabled } = formData;

  const emailToken = props.match.params.emailToken;

  const authenticateToken = async () => {
    try {
      console.log(' about to fetch');
      const res = await fetch('/auth/new-password', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${emailToken}`
        }
      });

      const data = await res.json();

      // If the server is unable to verify the token
      if (!data.token) {
        history.push('/');
      }
    } catch (error) {
      console.log('error');
      console.error(error.message);
      throw error;
    }
  };

  if (!emailToken) {
    history.push('/');
  } else {
    // Authenticate token with server
    authenticateToken();
  }

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
      buttonDisabled: false
    });
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    let payload = {
      password
    };

    try {
      const res = await fetch('/new-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      console.log('data', data);
      setFormData({ ...formData, buttonDisabled: true });
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
          <legend>New Password</legend>
          <div className="form-group">
            <label htmlFor="newPassword">Email address</label>
            <input
              type="email"
              className="form-control"
              id="newPassword"
              aria-describedby="passwordHelp"
              placeholder="Enter password"
              required
              name="password"
              value={password}
              onChange={evt => onChange(evt)}
            />
          </div>
          <button
            disabled={buttonDisabled}
            type="submit"
            className="btn btn-primary float-right"
          >
            Save New Password
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default NewPassword;
