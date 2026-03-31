import './App.css'
import { useCounterStore } from './zustand/store'

function App() {
  const count = useCounterStore(state => state.count)
  
  return (
    <>
    </>
  )
}

export default App
