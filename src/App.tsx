import './App.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Demo } from './keysLists'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Demo />
    </QueryClientProvider>
  )
}

export default App
