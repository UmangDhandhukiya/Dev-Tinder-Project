import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],   
  reducers: {
    addConnection: (state, action) => {
      return Array.isArray(action.payload) ? action.payload : []; 
    },
  },
});

export const { addConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
