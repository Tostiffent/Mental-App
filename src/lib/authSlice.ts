import {
  createSlice,
  createAsyncThunk,
  createSelector,
  PayloadAction,
} from "@reduxjs/toolkit";
import { verifyIdentity } from "./api";
import { RootState } from "./store";

export type AuthData = {
  user_id: string;
  username: string;
  email: string;
};

export type AuthState = {
  status: "idle" | "loading" | "success" | "error";
  data: AuthData;
};

const initialAuthState: AuthState = {
  status: "idle",
  data: {
    user_id: "",
    username: "",
    email: "",
  },
};

export const fetchIdentity = createAsyncThunk(
  "auth/fetchIdentity",
  async (auth_token: string | undefined, {}) => {
    if (!auth_token) {
      let stored_token = window.localStorage.getItem("auth_token");
      if (stored_token) {
        auth_token = stored_token;
      } else {
        throw "Auth token not found";
      }
    }
    const response = await verifyIdentity(auth_token);

    return response;
  }
);

const authSlice = createSlice({
  //the name of the slice reducer, to be used while creating thunk functions
  name: "auth",
  //the initial state the store will have and which will be controlled by this slice
  initialState: initialAuthState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIdentity.pending, (state, _) => {
        state.status = "loading";
      })
      .addCase(
        fetchIdentity.fulfilled,
        (state, action: PayloadAction<AuthData>) => {
          const authData = action.payload;

          if (authData) {
            state.data = authData;
            state.status = "success";
          }
        }
      )
      .addCase(fetchIdentity.rejected, (state, _) => {
        state.status = "error";
      });
  },
});

export const selectAuth = () => (state: RootState) => state.auth;

export const selectAuthData = () =>
  createSelector(selectAuth(), (auth) => auth.data);

export default authSlice.reducer;
