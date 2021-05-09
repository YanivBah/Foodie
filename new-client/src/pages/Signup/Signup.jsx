import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import Context from "../../Context";
import './Signup.css';

export const Signup = () => {
  const { alertPopup } = useContext(Context);
  const history = useHistory();

  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: ""
  });

  const handleSignup = async (event) => {
    event.preventDefault();
    if (inputValues.username === '' || inputValues.email === '' || inputValues.password === '') {
      return alertPopup("Empty field/s", "You have one or more empty fields.", "red", 2500);
    }
    if (inputValues.password !== inputValues.repeatPassword) {
      return alertPopup("Password", "The password fields are not matching.", "red", 2000);
    }
    const body = {
      email: inputValues.email,
      username: inputValues.username,
      password: inputValues.password
    };
    try {
      await axios.post('/api/user/signup', body);
      alertPopup("Success!", "Signup was successful!", "green", 2000);
      history.push('/login');
    } catch (error) {
      alertPopup("Sorry!", error?.response?.data?.message || "User validation failed", "red", 2000);
    }
  };

  return (
    <div className="signup">
      <div className="header">
        <h1>Signup to our community</h1>
        <p>
          Have an account already? <Link to="/login">login now.</Link>
        </p>
      </div>
      <form>
        <Input
          name="username"
          label="Username"
          type="text"
          placeholder="Enter a username"
          values={inputValues}
          onChange={setInputValues}
          whatToChange="username"
        />
        <Input
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          values={inputValues}
          onChange={setInputValues}
          whatToChange="email"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Enter a password"
          values={inputValues}
          onChange={setInputValues}
          whatToChange="password"
        />
        <Input
          name="repeatPassword"
          label="Repeat Password"
          type="password"
          placeholder="Enter your password again"
          values={inputValues}
          onChange={setInputValues}
          whatToChange="repeatPassword"
        />
        <Button text="Signup" onClick={handleSignup} />
      </form>
    </div>
  );
}