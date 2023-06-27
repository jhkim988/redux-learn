import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./postsReducer";

export default configureStore({ reducer: { posts: postsReducer }});