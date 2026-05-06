import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Users {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

  if (!res.ok) throw new Error("Failed fetching");

  return res.json();
}

// enabled for lazy loading
export function Query () {
  const [isLoadData, setIsLoadData] = useState(false);
  const { data: posts, isLoading, error, refetch } = useQuery<Users[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    enabled: isLoadData
  });

  const handleClick = () => {
    setIsLoadData(!isLoadData);
  }

  const handleRefetch = () => {
    refetch()
  }

  return (
    <div className="section">
      <h2>1. Intro and Setup</h2>
      <p>This is our first query without Tanstack Query</p>

      {isLoading && <p>Loading...</p>}
      {error && <p>Something went wrong</p>}

      <button onClick={handleClick}>Load Data</button>
      <button onClick={handleRefetch}>Refetch</button>

      {posts && posts.map(post => (
        <div key={post.id} className="card">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}