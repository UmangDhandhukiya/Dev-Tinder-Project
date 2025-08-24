import React from "react";
import EditProfile from "../../components/EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
    console.log(user)
  return (
    user && (
      <div>
        <EditProfile userData={user} />
      </div>
    )
  );
};

export default Profile;
