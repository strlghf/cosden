import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { type Users } from "./types";

async function fetchPosts () {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");

  return res.json()
}

function PostList () {
  const { data, isLoading, isFetching } = useQuery<Users[]>({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    staleTime: 1000 * 10,
    gcTime: 1000 * 10,
    // refetchOnWindowFocus: true,
    // refetchOnReconnect: true,
    // refetchInterval: 1000 * 3
  })
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isFetching && <p>Background fetching...</p>}

      {data &&
        data.map(post => (
          <div key={post.id} className="card">
            <p>{post.title}</p>
          </div>
        ))
      }
    </div>
  )
}

export function Caching () {
  const [show, setShow] = useState(true);
  const queryClient = useQueryClient();

  const handleClick = () => {
    setShow(!show);
  }

  const invalidateQuery = () => {
    queryClient.invalidateQueries({
      queryKey: ["posts"]
    })
  }

  return (
    <div className="section">
      <h2>Caching</h2>
      <p>Toggle TanS Query</p>

      <button onClick={invalidateQuery}>Invalidate Query</button>

      <button onClick={handleClick}>
        {show ? "Unmount" : "Mount"}
      </button>

      {show && <PostList />}
    </div>
  )
}