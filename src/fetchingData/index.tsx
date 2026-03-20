import { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export default function Demo () {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <div className="tutorial">
      <h1 className="mb-4 text-2xl">Data Fetching in React</h1>
      <ul>
        {posts.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  )
}