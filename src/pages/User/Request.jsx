import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../../utils/RequestSlice";
import { User, Briefcase, UserX, CheckCircle, XCircle } from "lucide-react";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      const response = await fetch(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          credentials: "include",
        }
      );
      const req = await response.json();
      console.log(req);
      fetchRequests();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/request/receiver", {
        credentials: "include",
      });
      const data = await response.json();
      dispatch(addRequest(data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400 bg-black">
        <UserX size={40} className="mb-2 text-amber-300" />
        <h1 className="text-lg font-semibold">No Requests found !!</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-amber-300 text-center">
        Pending Requests
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {requests.map((req, index) => (
          <div
            key={req._id || index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-zinc-900 shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Left Side - User Info */}
            <div className="flex items-center gap-4">
              <img
                src={req.fromuserid?.imageUrl}
                alt={`${req.fromuserid?.firstname} ${req.fromuserid?.lastname}`}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-amber-300"
              />
              <div>
                <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2">
                  <User size={16} className="text-amber-300" />
                  {req.fromuserid?.firstname} {req.fromuserid?.lastname}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-2">
                  <Briefcase size={14} className="text-amber-300" />
                  {req.fromuserid?.skill?.length > 0
                    ? req.fromuserid.skill.join(", ")
                    : "No skills added"}
                </p>
              </div>
            </div>

            {/* Right Side - Buttons */}
            <div className="flex gap-3 justify-end">
              {/* Mobile: Icon Only */}
              <button
                onClick={() => reviewRequest("rejected", req._id)}
                className="sm:hidden p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              >
                <XCircle size={20} />
              </button>
              <button
                onClick={() => reviewRequest("accepeted", req._id)}
                className="sm:hidden p-2 rounded-full bg-green-500 text-black hover:bg-green-600 transition"
              >
                <CheckCircle size={20} />
              </button>

              {/* Desktop: Full Buttons */}
              <button
                onClick={() => reviewRequest("rejected", req._id)}
                className="hidden sm:block px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-red-400 to-red-600 text-white hover:opacity-90 transition"
              >
                Reject
              </button>
              <button
                onClick={() => reviewRequest("accepeted", req._id)}
                className="hidden sm:block px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-black hover:opacity-90 transition"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Request;
