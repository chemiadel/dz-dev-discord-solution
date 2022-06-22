import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducers/data.reducer";
import userReducer from "./reducers/user.reducer";
export * from "./reducers";

export const store = configureStore({
  reducer: {
    userState: userReducer,
    dataState: dataReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
