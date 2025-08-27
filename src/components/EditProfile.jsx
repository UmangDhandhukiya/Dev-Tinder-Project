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
  const [skill, setSkill] = useState(userData.skill?.join(", ") || "");
  const [about, setAbout] = useState(userData.about);
  const [gender, setGender] = useState(userData.gender);
  const [age, setAge] = useState(userData.age);
  const [imageUrl, setImageUrl] = useState(userData.imageUrl);

  const dispatch = useDispatch();

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
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/profile/edit`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userForCard),
      });

      if (!response.ok) {
        console.error("Failed to update profile:", response.status);
        return;
      }

      const data = await response.json();
      dispatch(addUser(data.data));
    } catch (error) {
      console.error("Error while updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 flex flex-col lg:flex-row gap-8 text-gray-100">
      <div className="lg:w-1/3 flex justify-center">
        <UserProfileCard user={userForCard} />
      </div>

      <div className="lg:w-2/3 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 p-6 md:p-10 border border-gray-700">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent text-center mb-8">
          Edit Profile
        </h2>

        <form className="space-y-6" onSubmit={handleEdit}>
          {[
            {
              label: "First Name",
              value: firstname,
              setValue: setFirstname,
              placeholder: "Enter first name",
              icon: <User className="w-5 h-5 text-indigo-400" />,
            },
            {
              label: "Last Name",
              value: lastname,
              setValue: setLastname,
              placeholder: "Enter last name",
              icon: <UserCircle className="w-5 h-5 text-indigo-400" />,
            },
            {
              label: "Skill",
              value: skill,
              setValue: setSkill,
              placeholder: "Enter skills (comma separated)",
              icon: <Type className="w-5 h-5 text-indigo-400" />,
            },
          ].map((field, i) => (
            <div key={i}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {field.label}
              </label>
              <div className="flex items-center border border-gray-700 bg-gray-800/70 rounded-lg px-3 py-2 focus-within:border-indigo-500 transition">
                {field.icon}
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.setValue(e.target.value)}
                  placeholder={field.placeholder}
                  className="flex-1 bg-transparent text-gray-100 outline-none text-sm ml-2"
                />
              </div>
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              About
            </label>
            <div className="flex items-start border border-gray-700 bg-gray-800/70 rounded-lg px-3 py-2 focus-within:border-indigo-500 transition">
              <FileText className="w-5 h-5 text-indigo-400 mr-2 mt-1" />
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Write about yourself..."
                className="flex-1 bg-transparent text-gray-100 outline-none text-sm resize-none h-24"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-700 bg-gray-800/70 rounded-lg px-3 py-2 text-sm outline-none text-gray-100 focus:border-indigo-500 transition"
            >
              <option value="">Select Gender</option>
              <option value="male" className="bg-gray-900">
                Male
              </option>
              <option value="female" className="bg-gray-900">
                Female
              </option>
              <option value="other" className="bg-gray-900">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Age
            </label>
            <div className="flex items-center border border-gray-700 bg-gray-800/70 rounded-lg px-3 py-2 focus-within:border-indigo-500 transition">
              <Calendar className="w-5 h-5 text-indigo-400 mr-2" />
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                className="flex-1 bg-transparent text-gray-100 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Profile Image URL
            </label>
            <div className="flex items-center border border-gray-700 bg-gray-800/70 rounded-lg px-3 py-2 focus-within:border-indigo-500 transition">
              <Image className="w-5 h-5 text-indigo-400 mr-2" />
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="flex-1 bg-transparent text-gray-100 outline-none text-sm"
              />
            </div>
            {imageUrl && (
              <div className="flex justify-center mt-3">
                <img
                  src={imageUrl}
                  alt="Profile Preview"
                  className="w-24 h-24 object-cover rounded-full border-2 border-indigo-500 shadow-lg"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-100 py-3 rounded-lg text-sm font-semibold shadow-lg hover:opacity-90 active:scale-95 transition-transform"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
