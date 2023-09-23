import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { forumPost, forumPosts, post, posts } from "./api";

export interface ForumPost {
  post_id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

export interface InitialState {
  posts: ForumPost[] | [];
  currentPost: ForumPost | null;
}

const initialstate: InitialState = {
  posts: [],
  currentPost: null,
};

export const fetchForumPosts = createAsyncThunk(
  "forumData/fetchPosts",
  async () => {
    const postData: ForumPost[] = await forumPosts();
    return postData;
  }
);

export const fetchForumPost = createAsyncThunk(
  "forumData/fetchPost",
  async (id: String | null) => {
    if (!id) return null;
    const postData: ForumPost = await forumPost(id);
    console.log(postData);
    return postData;
  }
);

const postSlice = createSlice({
  name: "forumData",
  initialState: initialstate,
  reducers: {},
  extraReducers(builder: any) {
    builder
      .addCase(
        fetchForumPosts.fulfilled,
        (state: any, action: PayloadAction<ForumPost[]>) => {
          if (action.payload) {
            state.posts = action.payload;
          }
        }
      )
      .addCase(
        fetchForumPost.fulfilled,
        (state: any, action: PayloadAction<ForumPost | null>) => {
          if (action.payload) {
            //@ts-ignore
            state.currentPost = action.payload.post;
          } else {
            state.currentPost = null;
          }
        }
      );
  },
});

export default postSlice.reducer;
