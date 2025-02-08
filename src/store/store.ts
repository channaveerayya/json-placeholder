
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../slices/postsSlice";
import photosReducer from "../slices/photosSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        photos: photosReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
