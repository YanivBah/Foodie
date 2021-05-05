import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
import { useHistory } from 'react-router';

const Signup = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    const body = { email, username, password };
    try {
      const { data } = await axios.post("/api/user/signup", body);
      console.log(data);
      history.push('/login');
    } catch (e) {
        if (e?.response?.data) {
          console.log(e.response.data);
        }
    }
  };

  return (
    <form className="signup">
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="email">Email: </label>
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        value={password }
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </form>
  );
};

export default Signup;
