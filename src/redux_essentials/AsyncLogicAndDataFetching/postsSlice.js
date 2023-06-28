//@ts-check
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { client } from "./client";

/** @type {{ posts: any[], status: ('idle' | 'loading' | 'succeeded' | 'failed'), error: string | null }} */
const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // Async Thunk 로 로직 변경:
    // postAdded: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload);
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         user: userId,
    //       },
    //       error: false,
    //       meta: ''
    //     }
    //   }
    // },
    postUpdated(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    reactionAdded(state, action) {
      const { id, reaction } = action.payload;
      const existingPost = state.posts.find(post => post.id === id);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    }
  },

  // slice 외부에서 정의된 작업에 대한 응답으로 실행될 추가 케이스 reducer 정의
  // async thunk 가 진행되면서 dispatch 되는 action 들을 여기서 처리한다.
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });

    builder
      .addCase(addNewPost.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
    }
});

export const selectAllPosts = state => state.posts.posts;

export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);

/**
 * createAsyncThunk
 * args
 * 1. action type 의 접두어 - posts/fetchPosts
 * 2. Promise 리턴하는 콜백함수
 * 
 * 실행 순서
 * 1. dispatch(fetchPosts()) 호출
 * 2. fetchPosts thunk 가 'posts/fetchPosts/pending' action 을 dispatch 한다.
 * 3. reducer 에서 'posts/fetchPosts/pending' action 을 수신 받고 loading 으로 요청 상태를 바꿀 수 있다.
 * 4. Promise resolve 가 되면 action.payload 에 response.data 를 담아 'posts/fetchPosts/fulfilled' action 을 dispatch 한다.
*/
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get(`/fakeApi/posts`);
  return response.data;
});

export const addNewPost = createAsyncThunk(`posts/addNewPost`, async initialPost => {
  const response = await client.post('/fakeApi/posts', initialPost);
  return response.data;
});

export const { postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;