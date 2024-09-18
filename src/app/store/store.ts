import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { testSlice } from "../../features/scratch/testSlice";
import { eventSlice } from "../../features/events/eventSlice";
import { modalSlice } from "../common/modals/modalSlice";
import { authSlice } from "../../auth/authSlice";

export const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    events: eventSlice.reducer,
    modal: modalSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
