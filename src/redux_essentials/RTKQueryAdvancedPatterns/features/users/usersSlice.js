import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { client } from "../../client";
import { apiSlice } from "../api/apiSlice";

export const selectUsersResult = apiSlice.endpoints.getUsers.select();
const emptyUsers = [];

export const selectAllUsers = createSelector(selectUsersResult, usersResult => usersResult?.data ?? emptyUsers);
export const selectUserById = createSelector(selectAllUsers, (state, userId) => userId, (users, userId) => users.find(user => user.id === userId));

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

// export const { selectAll: selectAllUsers, selectById: selectUserById } =
  // usersAdapter.getSelectors((state) => state.users);

export const fetchUsers = createAsyncThunk(`users/fetchUsers`, async () => {
  const response = await client.get(`/fakeApi/users`);
  return response.data;
});

export default usersSlice.reducer;
