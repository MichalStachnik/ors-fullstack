import { useState, useContext } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Layout from '../components/Layout';

const Login: NextPage = () => {
  // const userContext = useContext(UserContext)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();

  const { email, password } = formData;

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  };

  const onSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const credentials = {
      email,
      password
    };

    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await res.json();
      console.log('data back after logging in', data);

      //   userContext.setUser(data);

      //   const OneDay = 86_400_000;
      const OneDay = 86400000;
      const Now = new Date().getTime();

      const expiresIn = OneDay + Now;

      // Set to localstorage
      //   localStorage.setItem('username', data.username);
      //   localStorage.setItem('userid', data.userId);
      //   localStorage.setItem('token', data.token);
      //   localStorage.setItem('expiresIn', expiresIn.toString());

      router.push('/');
    } catch (error) {
      console.log('error logging in');
      console.error(error.message);
      throw error;
    }
  };

  return (
    <Layout onInputChanged={() => null} searchValue={''}>
      <div className="my-3 text-white">
        <Link href="/">
          <button type="button" className="btn btn-outline-secondary">
            Back
          </button>
        </Link>
        <form
          className="my-3 p-5 container col-lg-8 border-primary card bg-dark"
          onSubmit={evt => onSubmit(evt)}
        >
          <fieldset>
            <legend>Login</legend>
            <div className="form-group">
              <label htmlFor="loginInputEmail">Email address</label>
              <input
                type="email"
                className="form-control text-white"
                id="loginInputEmail"
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
              <label htmlFor="loginInputPassword">Password</label>
              <input
                type="password"
                className="form-control text-white"
                id="loginInputPassword"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={evt => onChange(evt)}
              />
            </div>
            <small className="form-text text-muted">
              Forgot your password?
              <Link href="/forgot-password">click here</Link>
            </small>
            <button
              type="submit"
              className="btn btn-primary mt-3 float-right"
              disabled={false}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
