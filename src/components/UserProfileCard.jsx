import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/Constants";
import { removeUserFromFeed } from "../utils/FeedSlice";

export default function UserProfileCard({ user }) {
  const { _id, imageUrl, firstname, lastname, gender, skill, about } = user;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const response = await fetch(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json()
      console.log(data)

      dispatch(removeUserFromFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-gradient-to-b from-gray-900 to-black rounded-2xl shadow-lg border border-gray-800 p-6">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <img
            src={
              imageUrl || "/placeholder.svg?height=112&width=112&query=profile"
            }
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-amber-400 shadow-md"
            alt="profile"
          />
        </div>
      </div>

      <div className="text-center space-y-3 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-amber-300">
          {firstname + " " + lastname}
        </h2>

        <div className="space-y-2">
          <div className="flex justify-center">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs sm:text-sm bg-amber-500/20 text-amber-300 border border-amber-400/40">
              {gender}
            </span>
          </div>

          <p className="text-sm sm:text-base font-medium text-gray-300">
            {skill && skill.length > 0 ? skill.join(", ") : "No skills added"}
          </p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed text-center">
          {about || "No description available"}
        </p>
      </div>

      <div className="flex gap-3">
  <button
    onClick={() => handleSendRequest("ignored", _id)}
    className="flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-rose-500 via-red-500 to-pink-600 hover:opacity-90 transition-all duration-300 shadow-md"
  >
    Ignore
  </button>

  <button
    onClick={() => handleSendRequest("interested", _id)}
    className="flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 hover:opacity-90 transition-all duration-300 shadow-md"
  >
    Interested
  </button>
</div>

    </div>
  );
}
