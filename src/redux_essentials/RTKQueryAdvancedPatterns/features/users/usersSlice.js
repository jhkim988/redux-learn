import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { client } from "../../client";
import { apiSlice } from "../api/apiSlice";

// export const selectUsersResult = apiSlice.endpoints.getUsers.select();
const emptyUsers = [];

const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();

// const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
//   },
// });

// export const { selectAll: selectAllUsers, selectById: selectUserById } =
//   usersAdapter.getSelectors((state) => state.users);

export const fetchUsers = createAsyncThunk(`users/fetchUsers`, async () => {
  const response = await client.get(`/fakeApi/users`);
  return response.data;
});

// export default usersSlice.reducer;

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: responseData => usersAdapter.setAll(initialState, responseData)
    })
  }),
});

export const { useGetUsersQuery } = extendedApiSlice;

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select();

// export const selectAllUsers = createSelector(selectUsersResult, usersResult => usersResult?.data ?? emptyUsers);
// export const selectUserById = createSelector(selectAllUsers, (state, userId) => userId, (users, userId) => users.find(user => user.id === userId));
const selectUsersData = createSelector(selectUsersResult, usersResult => usersResult.data);
export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);