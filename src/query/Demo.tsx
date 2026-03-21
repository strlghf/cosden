import { useMutation, useQuery } from "@tanstack/react-query"
import { addTodo, fetchTodos } from ".";
import { useState } from "react";

export function Demo () {
  const [title, setTitle] = useState("");

  const { data: todos, isLoading } = useQuery({
    queryFn: () => fetchTodos(),
    queryKey: ["todos"],
  });

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      
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
      <div>
        <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
        <button onClick={handleClick}>Add Todo</button>
      </div>
      {todos?.map(todo => <div key={todo.id}>{todo.title}</div>)}
    </div>
  )
}