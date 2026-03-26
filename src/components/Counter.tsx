import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "../redux/state";
import { decrement, increment, incrementBy, decrementBy } from "../redux/state/counter/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  console.log(count)

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementBy(10))}>Increment 10</button>
        <button onClick={() => dispatch(decrementBy(10))}>Decrement 10</button>
      </div>
    </div>
  )
}

export default Counter