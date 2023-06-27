import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: '1', title: "First Post!", content: "Hello!"},
  { id: '2', title: 'Second Post', content: 'More text'},
]

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: (state, action) => {
      state.push(action.payload); // createSlice 내부에서만 이런 방식으로 업데이트 가능(immer)
    }
  }
})

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer