import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './ForgotPassword.css';

const ForgotPassword: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    buttonDisabled: true,
    alertShowing: false
  });

  const { email, buttonDisabled, alertShowing } = formData;

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
      setFormData({ ...formData, buttonDisabled: true, alertShowing: true });
    } catch (error) {
      console.log('error sending forget password');
      console.error(error.message);
      throw error;
    }
  };

  return (
    <div className="my-3 text-white">
      <Link to="/">
        <button type="button" className="btn btn-outline-secondary">
          Back
        </button>
      </Link>
      <form
        className="my-3 p-5 container col-lg-8 border-primary card bg-dark"
        onSubmit={evt => onSubmit(evt)}
      >
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
            className="btn btn-primary float-right"
          >
            Send Link
          </button>
        </fieldset>
      </form>
      {alertShowing && (
        <div className="alert alert-dismissible alert-success mx-auto col-lg-6 text-center">
          Please check your inbox to reset your email.
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
