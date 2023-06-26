import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { selectCount, increment, decrement, incrementByAmount, incrementAsync } from "./counterSlice";
/**
 * useSelector 를 이용해서 Redux 스토어 state 에서 필됴한 데이터 조각을 추출할 수 있다.
 * 내부적으로 selector(getStore()) 를 호출하여 값(selector 의 반환값)을 반환한다.
 * useSelector 의 값의 변경이 일어나면 리렌더링 된다.
 * 
 * 로컬(useState)에 유지할 state 와 전역 상태를 잘 구분해야 한다.
 * 1. 앱의 다른 부분에서 해당 데이터를 관리하는가?
 * 2. 원본 데이터를 기반으로 다른 데이터를 만들 수 있어야하나?
 * 3. 여러 구성 요소에 동일한 데이터가 사용되고 있는가?
 * 4. 상태를 주어진 시점으로 복원가능 해야하는가?
 * 5. 데이터를 캐싱하는가?
 * 6. UI 컴포넌트 핫 리로드 하는 동안 이 데이터를 일관되게 유지할 것인가.
 * 
 * 마지막으로 App 을 Provider 로 감씬디.
 */

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState('2');

  return (
    <div>
      <div>
        <button onClick={() => dispatch(increment())}>
          +
        </button>
        <span>{count}</span>
        <button onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <div>
        <input value={incrementAmount} onChange={e => setIncrementAmount(e.target.value)}/>
        <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>Add Amount</button>
        <button onClick={() => dispatch(incrementAsync(Number(increment) || 0))}>Add Async </button>
      </div>
    </div>
  )
}