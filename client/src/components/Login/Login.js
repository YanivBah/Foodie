import React, { useContext, useRef } from 'react';
import axios from 'axios';
import Context from "../../Context";
import './Login.css';

const Login = () => {
  const states = useContext(Context);
  const refs = {
    email: useRef(null),
    password: useRef(null),
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = refs.email.current.value;
    const password = refs.password.current.value;
    const body = {email, password};
    try {
      const { data } = await axios.post("/api/user/login", body);
      states.user.set(data);
    } catch(e) {
      if (e?.response?.data) {
        console.log(e.response.data);
      }
    }
  }

  return (
    <form className="login">
      <label htmlFor="email">Username/Email</label>
      <input ref={refs.email} type="text" id="email" />
      <br />
      <label htmlFor="password">Password</label>
      <input ref={refs.password} type="password" id="password" />
      <br />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
}

export default Login
