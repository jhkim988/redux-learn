import { createSlice, nanoid } from "@reduxjs/toolkit"

const postsSlice = createSlice({
  name: "posts",
  initialState: [],
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId
        }}
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { id, reaction } = action.payload;
      const existingPost = state.find(post => post.id === id);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  }
});

export const selectAllPosts = state => state.posts;

export const selectPostById = (state, postId) => state.posts.find(post => post.id === postId);

export default postsSlice.reducer;