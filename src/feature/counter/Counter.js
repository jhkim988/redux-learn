import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount, incrementAsync } from "./counterSlice";

export function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  const [input, setInput] = useState(1);

  return (
    <>
      <h1>{count}</h1>      
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <br />
      <input value={input} onChange={e => setInput(Number(e.target.value))} />
      <button onClick={() => dispatch(incrementByAmount(input))}>Add Amount</button>
      <button onClick={() => dispatch(incrementAsync(input))}>Add Amount Async</button>
    </>
  )
}