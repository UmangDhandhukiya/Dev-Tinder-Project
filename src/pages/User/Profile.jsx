import React from "react";
import EditProfile from "../../components/EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="min-h-screen bg-black text-gray-300 px-6 md:px-12 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-300 mb-8 text-center">
            Your Profile
          </h1>

          <div className="bg-zinc-900 rounded-2xl shadow-md hover:shadow-lg transition p-6 md:p-10">
            <EditProfile userData={user} />
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
