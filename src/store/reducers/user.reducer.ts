import { createSlice, Dispatch } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

export interface IUserState {
  user: any;
  loading: boolean;
}

const initialState: IUserState = {
  user: null,
  loading: true,
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initUser: (state, { payload }) => {
      //stop loading if no user
      if (!payload)
        return {
          ...state,
          loading: false,
        };

      //stop loading and set the data
      return {
        loading: false,
        user: payload,
      };
    },
    updateUser: (state, { payload }) => {
      return {
        ...state,
        user: payload,
      };
    },
    resetUser: (state) => {
      return {
        ...state,
        user: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { initUser, updateUser, resetUser } = authSlice.actions;

export const initUserThunk = () => (dispatch: Dispatch) => {
  // logic here that can dispatch actions or read state
  const token = localStorage.getItem("token");

  //If no token, send nothing
  if (!token) return dispatch(initUser(null));

  //If there's token, decoded and dispatch it
  const decoded = jwt_decode(token);
  dispatch(initUser(decoded));
};

export const updateUserThunk = (token: string) => (dispatch: Dispatch) => {
  // logic here that can dispatch actions or read state
  localStorage.setItem("token", token);

  //decod and dispatch it
  const decoded = jwt_decode(token);
  dispatch(updateUser(decoded));
};

export const resetUserThunk = () => (dispatch: Dispatch) => {
  localStorage.removeItem("token");

  dispatch(resetUser());
};

export default authSlice.reducer;
