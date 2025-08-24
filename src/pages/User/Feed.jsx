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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {feeds && (
        <div className="w-full max-w-sm">
          <UserProfileCard user={feeds} />
        </div>
      )}
    </div>
  );
};

export default Feed;
