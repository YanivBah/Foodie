import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import Context from "../../Context";
import validator from 'validator';
import './Signup.css';
import { ImageUploadPlusPreview } from '../../components/ImageUploadPlusPreview/ImageUploadPlusPreview';

export const Signup = () => {
  const { alertPopup } = useContext(Context);
  const history = useHistory();

  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    file: {
      raw: null,
      preview: null
    }
  });
    
  useEffect(() => {
    document.title = "Foodie - Signup now!";
  }, []);

  const handleSignup = async (event) => {
    event.preventDefault();
    if (inputValues.username === '' || inputValues.email === '' || inputValues.password === '') {
      return alertPopup("Empty field/s", "You have one or more empty fields.", "red", 3500);
    }
    if (/\W/g.test(inputValues.username)) {
      return alertPopup("Username", "The username can't include spaces or symbols.", "red", 3000);
    }
    if (!validator.isEmail(inputValues.email)) {
      return alertPopup("Email", "The email is invalid.", "red", 3000);
    }
    if (inputValues.password !== inputValues.repeatPassword) {
      return alertPopup("Password", "The password fields are not matching.", "red", 3000);
    }
    if (!validator.isStrongPassword(inputValues.password, {minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1})) {
      return alertPopup(
        "Password",
        "The password must be with atleast: 8 Characters, 1 Lowercase, 1 Uppercase and 1 Symbol.",
        "red",
        5000
      );
    }
    const body = {
      email: inputValues.email,
      username: inputValues.username,
      password: inputValues.password
    };
    const formData = new FormData();
    if (inputValues.file.raw) {
      formData.append("image", inputValues.file.raw);
    }
    formData.append("body", JSON.stringify(body));
    try {
      await axios.post("/api/user/signup", formData, {headers: {"Content-Type": "multipart/form-data"}});
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
        <ImageUploadPlusPreview
          name="fileupload"
          values={inputValues}
          whatToChange="file"
          onChange={setInputValues}
          text="Upload an avatar"
        />
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