import { createSlice } from "@reduxjs/toolkit";

/**
 * 슬라이스: 앱의 단일 기능에 대한 reducer 및 작업 모음.
 * usersReducer, postsReducer, commentsReducer 등을 만들고,
 * configureStore 에서 { users: usersReducer, posts: postsReducers, comments: commentsReducer } 로 store 를 만들었다면
 * 상태는 각각 state.users, state.posts, state.comments 가 되고, 이 상태들을 각각 담당한다.
 * 
 */

export const counterSlice = createSlice({
  name: "name",
  initialState: {
    value: 0
  },
  reducers: {
    increments: state => {
      state.value += 1; // RTK 에 내장돼 있는 immer 가 immutable update 를 수행해준다.
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;