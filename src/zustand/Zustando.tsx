import { useCounterStore } from "./store";

export function Zustando () {
  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);
  const incrementAsync = useCounterStore(state => state.incrementAsync);
  const decrementAsync = useCounterStore(state => state.decrementAsync);
  
  return (
    <>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <button onClick={incrementAsync}>Decrement</button>
      <button onClick={decrementAsync}>Decrement</button>
    </>
  )
}