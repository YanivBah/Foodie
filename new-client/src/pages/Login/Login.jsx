import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import Context from '../../Context';
import './Login.css';
import axios from 'axios';
export const Login = () => {
  const { user, alertPopup } = useContext(Context);
  const [inputValues, setInputValues] = useState({
    username: '',
    password: ''
  });
  const history = useHistory();

  useEffect(() => {
    document.title = "Foodie - Login";
  },[]);

  const handleLogin = async(event) => {
    event.preventDefault();
    const body = {
      email: inputValues.username,
      password: inputValues.password
    }
    try {
      const {data} = await axios.post('/api/user/login', body);
      user.set(data);
      alertPopup("Success!", "Login was successful!", "green", 1500);
      history.push('/');
    } catch (error) {
      alertPopup('Sorry', error.response.data, "red", 1500);
    }
  }

  return (
    <div className="login">
      <div className="header">
        <h1>Sign in to your account</h1>
        <p>
          Don't have an account? <Link to="/signup">Signup now.</Link>
        </p>
      </div>
      <form>
        <Input
          name="username"
          label="Username / E-mail"
          type="text"
          placeholder="Your username or e-mail"
          values={inputValues}
          onChange={setInputValues}
          whatToChange="username"
        />
        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Your password"
          values={inputValues}
          onChange={setInputValues}
          whatToChange="password"
        />
        <Button text="Login" onClick={handleLogin} />
      </form>
    </div>
  );
}
