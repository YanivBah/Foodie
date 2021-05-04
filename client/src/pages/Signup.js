import axios from "axios";
import React, { useRef } from "react";

const Signup = () => {
  const refs = {
    username: useRef(null),
    email: useRef(null),
    password: useRef(null),
  };

  const handleSignup = async () => {
    const username = refs.username.current.value;
    const email = refs.email.current.value;
    const password = refs.password.current.value;
    const body = { email, username, password };
    try {
      const { data } = await axios.post("/api/user/signup", body);
      console.log(data);
    } catch (e) {}
  };

  return (
    <div>
      <label htmlFor="username">Username: </label>
      <input ref={refs.username} type="text" id="username" />
      <br/>
      <label htmlFor="email">Email: </label>
      <input ref={refs.email} type="text" id="email" />
      <br />
      <label htmlFor="password">Password: </label>
      <input ref={refs.password} type="password" id="password" />
      <br />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
