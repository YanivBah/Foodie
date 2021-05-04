import axios from 'axios';
import React, { useRef } from 'react';

const Login = () => {

  const refs = {
    email: useRef(null),
    password: useRef(null),
  }

  const handleLogin = async () => {
    const email = refs.email.current.value;
    const password = refs.password.current.value;
    const body = {email, password};
    try {
      const { data } = await axios.post("/api/user/login", body);
      console.log(data);
    } catch(e) {

    }
  }

  return (
    <div>
      <label htmlFor="email">Username/Email: </label>
      <input ref={refs.email} type="text" id="email" />
      <br />
      <label htmlFor="password">Password: </label>
      <input ref={refs.password} type="password" id="password" />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login
