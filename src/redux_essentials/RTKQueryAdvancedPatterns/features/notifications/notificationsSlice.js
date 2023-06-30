import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { client } from "../../../AsyncLogicAndDataFetching/client";

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

const initialState = notificationsAdapter.getInitialState();

export const fetchNotifications = createAsyncThunk(
  `notifications/fetchNotifications`,
  
  /**
   * 첫 번째 인자: dispatch 를 호출할 때 한 개의 인자를 자유롭게 넘길 수 있다.
   * 두 번째 인자: thunkAPI 객체
   * - dispatch, getState 
   * - extra: store를 만들 때 thunk middleware 에 전달할 수 있는 추가 인수
   * - requestId: thunk 호출에 대한 unique id
   * - signal: 진행 중인 요청을 취소하는 데 사용할 수 있는 AbortController.signal 함수
   * - rejectWithValue: thunk가 error 를 받을 경우, rejected action 을 처리할 수 있는 util
   * 
   * createAsyncThunk 를 이용하지 않고 직접 thunk 를 만든다면 (dispatch, getState) 를 인자로 받게 된다.
  */
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState());
    const [latestNotification] = allNotifications;
    const latestTimestamp = latestNotification ? latestNotification.data : "";
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    );
    return response.data;
  }
);

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    allNotificationsRead(state, action) {
      Object.values(state.entities).forEach(notification => {
        notification.read = true;
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      // state.push(...action.payload);
      // state.forEach(notification => {
      //   notification.isNew = !notification.read
      // });
      // state.sort((a, b) => b.date.localeCompare(a.date));
      notificationsAdapter.upsertMany(state, action.payload);
      Object.values(state.entities).forEach(notification => {
        notification.isNew = !notification.read;
      })
    });
  },
});

export const { selectAll: selectAllNotifications } = notificationsAdapter.getSelectors(state => state.notifications);

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
