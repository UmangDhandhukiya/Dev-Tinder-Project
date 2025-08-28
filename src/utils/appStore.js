import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./ConnectionSlice"
import requestReducer from "./RequestSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection:connectionReducer,
    request:requestReducer
  },
});

export default appStore;
