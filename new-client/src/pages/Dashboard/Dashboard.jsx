import React, { useContext, useEffect, useState } from 'react';
import './Dashboard.css';
import Context from "../../Context";
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import axios from 'axios';
import validator from 'validator';
import { ImageUploadPlusPreview } from '../../components/ImageUploadPlusPreview/ImageUploadPlusPreview';
import { useHistory } from 'react-router';

export const Dashboard = () => {
  const { user, alertPopup } = useContext(Context);
  const [values, setValues] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (user.get) {
      setValues({
        username: user.get.user.username,
        email: user.get.user.email,
        oldPassword: "",
        newPassword: "",
        newRepeatPassword: "",
        file: {
          raw: null,
          preview: `/api/user/avatar?username=${user.get.user.username}&v=${Date.now()}`,
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = async(e) => {
    e.preventDefault();
    if (values.username === user.get.user.username && values.email === user.get.user.email && values.newPassword === '' && values.newRepeatPassword === '' && !values.file.raw) {
      return alertPopup("Nothing changed", "You changed nothing.", "red", 3500);
    }
    if (values.oldPassword === '') {
      return alertPopup("Password", "Old password is required to all updates.", "red", 3500);
    }
    if (values.newPassword !== '' && values.newPassword !== values.newRepeatPassword) {
      return alertPopup("Password", "New password fields doesn't match.", "red", 3500);
    }
    if (values.newPassword !== '' && values.newPassword === values.oldPassword) {
      return alertPopup("Password", "Old password and new password are the same.", "red", 3500);
    }
    if (values.newPassword !== '' && !validator.isStrongPassword(values.newPassword, {minLength: 8, minLowercase: 1, minUppercase: 1, minSymbols: 1})) {
      return alertPopup(
        "Password",
        "The password must be with atleast: 8 Characters, 1 Lowercase, 1 Uppercase and 1 Symbol.",
        "red",
        5000
      );
    }
    if (values.username !== user.get.user.username && /\W/g.test(values.username)) {
      return alertPopup("Username", "The username can't include spaces or symbols.", "red", 3000);
    }
    if (values.email !== user.get.user.email && !validator.isEmail(values.email)) {
      return alertPopup("Email", "The email is invalid.", "red", 3000);
    }
    const body = {};
    if (values.username !== user.get.user.username) {
      body.username = values.username;
    }
    if (values.email !== user.get.user.email) {
      body.email = values.email;
    }
    if (values.newPassword !== '') {
      body.newPassword = values.newPassword;
    }
    body.oldPassword = values.oldPassword;
    const formData = new FormData();
    if (values.file.raw) {
      formData.append("image", values.file.raw);
    }
    formData.append("body", JSON.stringify(body));
    try {
      const { data } = await axios.patch("/api/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.get.token}`,
        },
      });
      user.set(prev => {
        const newUserData = {...prev};
        newUserData.user = data;
        return newUserData;
      });
      alertPopup("Updated!", "User data updated successfully!", "green", 3000);
      history.push(`/profile/${values.username}`);
    } catch (error) {
      alertPopup("Not updated!", "There was a problem updating your data.", "red", 3000);
    }
  }

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
        <p>
          Change your user data how you like.
          <br />
          All updates must include your <span>old password</span>.
        </p>
      </div>
      {values && (
        <form>
          <ImageUploadPlusPreview
            name="fileupload"
            values={values}
            whatToChange="file"
            onChange={setValues}
            text="Upload an avatar"
          />
          <Input
            name="username"
            label="Enter username"
            type="text"
            placeholder="username"
            values={values}
            onChange={setValues}
            whatToChange="username"
          />
          <Input
            name="email"
            label="email"
            type="email"
            placeholder="Enter username"
            values={values}
            onChange={setValues}
            whatToChange="email"
          />
          <Input
            name="oldpassword"
            label="old password (required)"
            type="password"
            placeholder="Enter old password"
            values={values}
            onChange={setValues}
            whatToChange="oldPassword"
          />
          <Input
            name="newpassword"
            label="new password"
            type="password"
            placeholder="Enter new password"
            values={values}
            onChange={setValues}
            whatToChange="newPassword"
          />
          <Input
            name="newrepeatpassword"
            label="Repeat new password"
            type="password"
            placeholder="Enter new password again"
            values={values}
            onChange={setValues}
            whatToChange="newRepeatPassword"
          />
          <Button text="Update" onClick={handleUpdate} />
        </form>
      )}
    </div>
  );
}
