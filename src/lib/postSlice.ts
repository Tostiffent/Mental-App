import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { post, posts } from "./api";

export interface Post {
  post_id: string;
  title: string;
  content: string;
  desc: string;
  thumbnail: string;
  type: string;
  author: string;
}

export interface InitialState {
  posts: Post[] | [];
  currentPost: Post | null;
}

const initialstate: InitialState = {
  posts: [],
  currentPost: null,
};

export const getPosts = createAsyncThunk(
  "postData/fetchPosts",
  async (type: String) => {
    const postData: Post[] = await posts(type);
    return postData;
  }
);

export const getPost = createAsyncThunk(
  "postData/fetchPost",
  async (id: String) => {
    const postData: Post = await post(id);
    return postData;
  }
);

const postSlice = createSlice({
  name: "postData",
  initialState: initialstate,
  reducers: {},
  extraReducers(builder: any) {
    builder
      .addCase(
        getPosts.fulfilled,
        (state: any, action: PayloadAction<Post[]>) => {
          if (action.payload) {
            state.posts = action.payload;
          }
        }
      )
      .addCase(getPost.fulfilled, (state: any, action: PayloadAction<Post>) => {
        if (action.payload) {
          state.currentPost = action.payload;
        }
      });
  },
});

export default postSlice.reducer;
