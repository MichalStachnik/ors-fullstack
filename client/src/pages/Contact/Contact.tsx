import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Contact.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  const history = useHistory();

  const { email, message } = formData;

  const onChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const payload = {
      email,
      message
    };

    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      history.push('/');
    } catch (error) {
      console.log('error sending message');
      console.error(error.message);
      throw error;
    }
  };

  const isSendDisabled = email.length === 0 || message.length === 0;

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
          <legend>Contact</legend>
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
          <div className="form-group">
            <label htmlFor="commentTextarea">Add comment</label>
            <textarea
              className="form-control"
              id="commentTextarea"
              rows={3}
              name="message"
              value={message}
              onChange={evt => onChange(evt)}
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 float-right"
            disabled={isSendDisabled}
          >
            Send
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Contact;
