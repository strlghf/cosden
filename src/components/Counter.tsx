import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../redux/state";
import { decrement, increment, incrementBy, decrementBy, incrementAsync } from "../redux/state/counter/counterSlice";

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  console.log(count)

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
        <button onClick={() => dispatch(incrementBy(10))}>Increment 10</button>
        <button onClick={() => dispatch(decrementBy(10))}>Decrement 10</button>
        <button onClick={() => dispatch(incrementAsync(10))}>Increment Async</button>
      </div>
    </div>
  )
}

export default Counter