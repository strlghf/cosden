const todos = [
  {
    id: 1,
    title: "Learn HTML",
    completed: false
  },
  {
    id: 2,
    title: "Learn CSS",
    completed: false
  },
  {
    id: 3,
    title: "Learn JavaScript",
    completed: false
  },
  {
    id: 4,
    title: "Learn React",
    completed: false
  },
  {
    id: 5,
    title: "Learn Next.js",
    completed: false
  },
  {
    id: 6,
    title: "Learn Node",
    completed: false
  },
  {
    id: 7,
    title: "Learn Express",
    completed: false
  },
]

export async function fetchTodos (query = ""): Promise<Todo[]> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  console.log("fetched todos");
  
  const filteredTodos = todos.filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));

  return [...filteredTodos];
}

export async function addTodo (todo: Pick<Todo, "title">): Promise<Todo> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const newTodo = {
    id: todos.length + 1,
    title: todo.title,
    completed: false
  }

  todos.push(newTodo)

  return newTodo;
}