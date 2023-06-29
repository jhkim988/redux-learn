import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../client";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

// getInitialState 으로 초기 { ids: [], entities: {} } 를 생성하고, 넣은 인자로 추가 필드를 생성한다.
const initialState = postsAdapter.getInitialState({
  status: "idle",
  error: null,
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded: (state, action) => {
      const { id, reaction } = action.payload;
      const existingPost = state.entities[id];
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.posts = state.posts.concat(action.payload);
        postsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addNewPost.pending, (state, action) => {
        state.status = "loading;";
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.posts.push(action.payload);
        postsAdapter.addOne(state, action.payload);
      });
  },
});

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => state.posts);

export const addNewPost = createAsyncThunk(
  `posts/addNewPosts`,
  async (initialPost) => {
    const response = await client.post(`/fakeApi/posts`, initialPost);
    return response.data;
  }
);

export const fetchPosts = createAsyncThunk(`posts/fetchPosts`, async () => {
  const response = await client.get(`/fakeApi/posts`);
  return response.data;
});

// posts 와 userId 가 바뀌지 않는다면 리턴값도 바뀌지 않는다.
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId], // 입력 선택기
  (posts, userId) => posts.filter((post) => post.user === userId) // 출력 선택기
);

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
