import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { posts } from "./api";

const initialstate = {
  posts: [],
};

export const getPosts = createAsyncThunk(
  "postData/fetchPosts",
  async (type: String) => {
    const postData = await posts(type);
    return postData;
  }
);

const postSlice = createSlice({
  name: "postData",
  initialState: initialstate,
  reducers: {},
  extraReducers(builder: any) {
    builder.addCase(getPosts.fulfilled, (state: any, action: any) => {
      if (action.payload) {
        state.posts = action.payload;
      }
    });
  },
});

export default postSlice.reducer;
