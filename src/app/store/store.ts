import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { authSlice } from "../../auth/authSlice";
import { eventSlice } from "../../features/events/eventSlice";
import { followSlice } from "../../features/profiles/follow/followSlice";
import { photoSlice } from "../../features/profiles/photoSlice";
import { profileSlice } from "../../features/profiles/profileSlice";
import { modalSlice } from "../common/modals/modalSlice";

export const store = configureStore({
  reducer: {
    events: eventSlice.reducer,
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
    profiles: profileSlice.reducer,
    photos: photoSlice.reducer,
    follows: followSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
