import { useState } from "react";

interface TodoProps {
  todo: Todo
}

export function TodoCard({ todo }: TodoProps) {
  const [checked, setChecked] = useState(todo.completed);

  return (
    <div>
      <span data-testid={`todo-${todo.id}`}>{todo.title}</span>

      <input 
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.value)}
      />
    </div>
  )
}