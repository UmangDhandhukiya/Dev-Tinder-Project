import React, { useEffect } from "react";
import { BASE_URL } from "../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../../utils/ConnectionSlice";
import { User, Briefcase, UserX } from "lucide-react";
import { Link } from "react-router-dom";

const Connection = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const response = await fetch(BASE_URL + "/user/connection", {
        credentials: "include",
      });
      const connection = await response.json();
      console.log(connection.data);
      
      dispatch(addConnection(connection?.data));
    } catch (error) {
      console.error("Error fetching connections:", error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-400 bg-black">
        <UserX size={40} className="mb-2 text-amber-300" />
        <h1 className="text-lg font-semibold">No Connection found !!</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-amber-300 text-center">
        Your Connections
      </h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {connections.map((connection, index) => (
          <div
            key={connection._id}
            className="flex items-center justify-between bg-zinc-900 shadow-md rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={connection.imageUrl}
                alt={`${connection.firstname} ${connection.lastname}`}
                className="w-14 h-14 rounded-full object-cover border border-amber-300"
              />
              <div>
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <User size={18} className="text-amber-300" />
                  {connection.firstname} {connection.lastname}
                </h2>
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Briefcase size={16} className="text-amber-300" />
                  {connection.skill.length > 0
                    ? connection.skill.join(", ")
                    : "No skills added"}
                </p>
              </div>
            </div>

           <Link to={"/chat/" + connection._id}> <button className="px-4 py-2 text-sm bg-amber-300 text-black font-medium rounded-xl hover:bg-amber-400 transition-colors duration-200">
              Message
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connection;
