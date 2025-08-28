import React, { useEffect } from "react";
import UserProfileCard from "../../components/UserProfileCard";
import { BASE_URL } from "../../utils/Constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../../utils/FeedSlice";
import { UserX } from "lucide-react";

const Feed = () => {
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);

  const fetchFeed = async () => {
    if (feeds && feeds.length > 0) return;

    try {
      const response = await fetch(BASE_URL + "/user/feed", {
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Failed to fetch feed");
        return;
      }

      const feed = await response.json();
      dispatch(addFeed(feed?.data || []));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Show "No feeds" message */}
        {feeds && feeds.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl shadow-md p-6 ">
            <UserX size={40} className="mb-3 text-amber-300" />
            <p className="text-lg font-semibold text-gray-400">
              No more feeds available
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Check back later for more profiles!
            </p>
          </div>
        ) : (
          feeds && <UserProfileCard user={feeds[0]} />
        )}
      </div>
    </div>
  );
};

export default Feed;
