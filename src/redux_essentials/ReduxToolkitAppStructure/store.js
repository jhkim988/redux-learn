import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice"; // features, 기능

/**
 * RTK 의 configureStore 를 통해 store 를 생성한다.
 * reducer 를 인자로 넣는다.
 * 여러 가지 기능(features) 가 있을 수 있고, 각 기능마다 reducer 가 있을 수 있다.
 * configureStore 를 통해 여러 reducer 를 모두 전달할 수 있다.
 * { counter: counterReducer } 로 전달하는 것은 state.counter 를 담당하는 reducer 가 counterReducer 라는 의미이다.
 * 
 * 여러 플러그인(미들웨어, 인핸서)를 이 곳 configureStore 에서 설정할 수 있다.
 */
export default configureStore({
  reducer: {
    counter: counterReducer,
  }
});