import React, { useState } from "react";
import {
  User,
  Type,
  FileText,
  UserCircle,
  Calendar,
  Image,
} from "lucide-react";
import UserProfileCard from "./UserProfileCard";
import { BASE_URL } from "../utils/Constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";

const EditProfile = ({ userData }) => {
  const [firstname, setFirstname] = useState(userData.firstname);
  const [lastname, setLastname] = useState(userData.lastname);
  const [skill, setSkill] = useState(userData.skill?.join(", ") || ""); // store as string
  const [about, setAbout] = useState(userData.about);
  const [gender, setGender] = useState(userData.gender);
  const [age, setAge] = useState(userData.age);
  const [imageUrl, setImageUrl] = useState(userData.imageUrl);

  const dispatch = useDispatch();

  // Convert string -> array for card preview
  const userForCard = {
    firstname,
    lastname,
    skill: skill
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean),
    about,
    gender,
    age,
    imageUrl,
  };

  const handleEdit = async (e) => {
    e.preventDefault(); // prevent form reload

    try {
      const response = await fetch(`${BASE_URL}/profile/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
        body: JSON.stringify(userForCard),
      });

      if (!response.ok) {
        console.error("Failed to update profile:", response.status);
        return;
      }

      const data = await response.json();
      console.log(data);
      
      console.log("Profile updated:", data);
      dispatch(addUser(data.data));
    } catch (error) {
      console.error("Error while updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col lg:flex-row gap-8">
      {/* Left Side: User Overview */}
      <div className="lg:w-1/3 flex justify-center">
        <UserProfileCard user={userForCard} />
      </div>

      {/* Right Side: Edit Form */}
      <div className="lg:w-2/3 bg-white rounded-2xl shadow-md p-6 md:p-10">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Profile
        </h2>

        <form className="space-y-5" onSubmit={handleEdit}>
          {/* Firstname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="Enter first name"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          {/* Lastname */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <UserCircle className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Enter last name"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          {/* Skill */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Type className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="text"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="Enter skills (comma separated)"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          {/* About */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              About
            </label>
            <div className="flex items-start border rounded-lg px-3 py-2">
              <FileText className="w-5 h-5 text-gray-400 mr-2 mt-1" />
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write about yourself..."
                className="flex-1 outline-none text-sm resize-none h-20"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="flex-1 outline-none text-sm"
              />
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Image URL
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2">
              <Image className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 outline-none text-sm"
              />
            </div>
            {imageUrl && (
              <div className="flex justify-center mt-3">
                <img
                  src={imageUrl}
                  alt="Profile Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>

          {/* Submit */}
          <button
          onSubmit={handleEdit}
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
