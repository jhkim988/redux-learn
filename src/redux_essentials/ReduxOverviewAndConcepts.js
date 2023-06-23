import { useState } from 'react';

/**
 * one-way data flow
 * state -> view --(user)--> action -> state
 * 여러 컴포넌트가 같은 상태를 공유하고 사용하게 된다면 복잡해진다.
 * -> 공유 상태를 추출하여, 어디서든지 상태에 접근하거나 작업을 트리거 한다.
 * 상태관리와 view 를 분리한다.
 */
function Counter() {
  // State: source of truth
  const [counter, setCounter] = useState(0);

  // Action: state 업데이트 트리거
  const increment = () => {
    setCounter(prev => prev + 1);
  }

  // View: 현재 state 에 기반한 UI 의 선언적 설명
  return (
    <div>
      Value: {counter} <button onClick={increment}>Increment</button>
    </div>
  )
}

/**
 * Immutability
 * redux 에서는 모든 상태 업데이트가 불변으로 수행되야 한다.
 */

// mutable
const obj = { a: 1, b: 2 };
obj.b = 3; 

const arr = ['a', 'b'];
arr.push('c');
arr[1] = 'd';

// immutable
const obj2 = { ...obj, b: 3}; 
const arr2 = [...arr, 'd'];


/**
 * 용어
 * Action:
 * - type 필드가 있는 JS object.
 * - app 에서 발생한 일을 묘사하는 이벤트.
 * - type 은 설명이 포함된 이름을 지정하는 문자열
 * - domain/eventName
 * - payload 필드: 액션에 대한 추가 정보
 * 
 * Reducer
 * - (state, action) => newState
 * - app 에서 발생한 일(action)을 처리하는 핸들러
 * - 현재 상태와 action 을 기반으로 새 상태값만 계산해야 한다.
 * - 기존 상태를 수정하면 안된다. immutable update 를 수행해야 한다.
 * - 랜덤값을 계산하거나, 비동기 로직을 수행하거나, 사이드 이펙트를 일으키면 안된다.
 * 
 * Store
 * - Redux 상태가 저장되는 객체
 * - reducer 를 인자로 받아 store 가 생성되고, getState 메서드로 현재 상태 값을 알 수 있다.
 * 
 * Dispatch
 * - Redux store 메서드 중 하나. state 를 업데이트 하기 위해서는 dispatch 에 action 객체를 넣고 호출해야 한다.
 * - dispatch 에 action 을 넣고 호출하면 store 내부에서 reducer 를 통해 상태를 업데이트 한다.
 * - 보통 action creator 를 이용하여 action 을 만들어 dispatch 한다. (dispatch(increment()))
 * 
 * Selector
 * - 저장된 상태값에서 특정 정보를 추출하는 함수
 * - app 규모가 커지면 동일한 데이터를 다른 부분에서 읽는 경우가 많아지는데, 로직의 중복을 피할 수 있다.
 */

/**
 * Redux Data Flow
 * - 초기화
 * 1. reducer 를 이용해 store 를 만든다.
 * 2. 초깃값을 이용하여 초기 상태를 설정한다.
 * 3. 초기상태를 바탕으로 렌더링 한다. 컴포넌트는 store 업데이트를 subscribe 하여 변경됐는지 파악한다.
 * 
 * - 업데이트 발생
 * 1. 사용자가 클릭하는 등, 어떤 일이 발생한다.
 * 2. action 이 dispatch 된다.
 * 3. 스토어는 현재 상태와 액션을 바탕으로 다음 상태를 계산하여 저장한다.
 * 4. 스토어는 등록된 모든 부분에 업데이트를 알린다.
 * 5. 스토어 데이터가 필요한 컴포넌트는 필요한 상태가 변경됐는지 확인한다.
 * 6. 변경된 데이터를 보는 컴포넌트는 자동으로 새 데이터로 업데이트 된다.
 */