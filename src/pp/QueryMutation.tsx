import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

async function createPost(newPost) {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(newPost),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  });
  return res.json();
}

export function QueryMutation () {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { mutate, data: newPost, isPending, isError, error } = useMutation({
    mutationFn: createPost
  })

  const handleClick = () => {
    mutate({ title, body, userId: 1 })
  }

  return (
    <div className="section">
      <h2>Mutations</h2>
      <p>Mutations are used to create, update, or delete data</p>
      
      <input 
        placeholder="Post title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Post body"
        value={body}
        onChange={e => setBody(e.target.value)}
      />

      <button onClick={handleClick}>Create Post</button>

      {isPending && <p>Creation post...</p>}
      {isError && <p>Something went wrong: {error.message}</p>}

      {newPost && (
        <div className="card">
          <h4>{newPost.title}</h4>
          <p>{newPost.body}</p>
        </div>
      )}
    </div>
  )
}