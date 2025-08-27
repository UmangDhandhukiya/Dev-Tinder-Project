import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionReducer from "./connection"
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connection:connectionReducer
  },
});

export default appStore;
