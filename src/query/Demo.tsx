import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addTodo, fetchTodos } from ".";
import { useState } from "react";
import { type Todo } from "./types.d";

export function Demo () {
  const queryClient = useQueryClient();

  const [search] = useState("");
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryFn: () => fetchTodos(search),
    queryKey: ["todos", { search }],
    staleTime: Infinity,
    // cacheTime: 0,
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  async function handleClick () {
    try {
      await addTodoMutation({ title });
      setTitle("");
    } catch (e) {
      console.error(e);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 data-testid="cypress-title">Cypress Demo</h1>
      <div>
        <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
        <button onClick={handleClick}>Add Todo</button>
      </div>
      {todos?.map(todo => <div key={todo.id}>{todo.title}</div>)}
    </div>
  )
}