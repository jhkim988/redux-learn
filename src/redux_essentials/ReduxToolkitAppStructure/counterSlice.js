import { createSlice } from "@reduxjs/toolkit";

/**
 * 슬라이스: 앱의 단일 기능에 대한 reducer 및 작업 모음.
 * usersReducer, postsReducer, commentsReducer 등을 만들고,
 * configureStore 에서 { users: usersReducer, posts: postsReducers, comments: commentsReducer } 로 store 를 만들었다면
 * 상태는 각각 state.users, state.posts, state.comments 가 되고, 이 상태들을 각각 담당한다.
 * 
 * createSlice 는 액션을 자동으로 생성해준다.
 * 
 * reducer 작성 방법
 * 1. 오직 state 와 action 으로 새 상태를 계산해야 한다.
 * 2. immutable update 를 해야한다.
 * 3. 비동기 로직이나 사이드 이펙트가 있으면 안된다.
 * 
 * 입력 인자를 통해서만 계산이 되어 코드를 예측 가능하게 하고 테스트를 쉽게 할 수 있다.
 * 외부 변수에 의존하거나 무작위로 작동하면, 실행할 때마다 어떤 일이 발생하는지 알기 어렵다.
 * immer 가 내장돼 있기 때문에 state 를 직접 변경해도 내부에서 immutable update 를 수행한다.
 * 
 * Async 로직 - Thunks, redux-thunk 미들웨어 필요하지만, RTK 에 내장돼 있다.
 * thunk: 비동기 논리를 포함할 수 있는 특정 종류의 Redux 함수
 * 1. dispatch 및 getState 를 인수로 가려오는 내부 thunk 함수
 * 2. thunk 함수를 생성하고 반환하는 외부 생성자 함수
*/

export const counterSlice = createSlice({ // action type string action creator function, action object 만들어준다.
  name: "counter",
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => { // { type: "counter/increment"}
      state.value += 1; // RTK 에 내장돼 있는 immer 가 immutable update 를 수행해준다.
    },
    decrement: state => { // { type: "counter/decrement"}
      state.value -= 1;
    },
    incrementByAmount: (state, action) => { // { type: "incrementByAmount"}
      state.value += action.payload;
    }
  }
});

// redux thunk
export const incrementAsync = amount => dispatch => {
  setTimeout(() => dispatch(incrementByAmount(amount)), 1000);
}
// dispatch(incrementAsync(5));

export const fetchUserById =  (userId) => {
  return async (dispatch, getState) => { // dispatch 와 getState 에 접근할 수 있다.
    try {
      // const user = await userAPI.fetchById(userId);
      // dispatch(userLoaded(user));
    } catch (err) {
      // error handle
    }
  }
}

export const selectCount = state => state.counter.value;

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;