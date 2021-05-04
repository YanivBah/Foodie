import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const Signup = () => {
  const {username} = useParams();
  const [profile, setProfile] = useState(null);


  useEffect(() => {
    const fetching = async() => {
      try {
        const {data} = await axios.get(`/api/user/info?username=${username}`);
        return setProfile(data);
      } catch (e) {

      }
    }
    fetching();
  },[username])

  return (
    <div>
      Profile
      {profile && JSON.stringify(profile)}
    </div>
  );
};

export default Signup;
