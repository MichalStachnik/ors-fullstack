import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    buttonDisabled: true
  });

  const { email, buttonDisabled } = formData;

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
      //   history.push('/');
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
          <button
            disabled={buttonDisabled}
            type="submit"
            className="btn btn-primary"
          >
            Send Link
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ForgotPassword;
