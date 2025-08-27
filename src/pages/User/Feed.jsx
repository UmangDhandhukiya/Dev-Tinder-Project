import React, { useEffect } from "react";
import UserProfileCard from "../../components/UserProfileCard";
import { BASE_URL } from "../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/FeedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feeds) return;

    try {
      const response = await fetch(BASE_URL + "/user/feed", {
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Failed to fetch feed");
        return;
      }

      const feed = await response.json();
      dispatch(addFeed(feed?.data[0])); // sample static index
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-10">
      {feeds ? (
        <div className="w-full max-w-sm md:max-w-md">
          <UserProfileCard user={feeds} />
        </div>
      ) : (
        <div className="text-center text-gray-400">
          <h1 className="text-lg">Loading feed...</h1>
        </div>
      )}
    </div>
  );
};

export default Feed;
