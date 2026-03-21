/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

interface Post {
  id: number;
  title: string;
}

export function Demo () {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>();
  const [page, setPage] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async() => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, controller);
        
        if (!response.ok) throw new Error("Error fetching data");

        const posts = (await response.json()) as Post[];
        setPosts(posts);
        setError(null);
      } catch (e: any) {
        if (e.name === "AbortError") {
          console.log("Aborted"); 
          return;
        }
        setError(e)
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();

    return () => controller.abort();
  }, [page]);

  if (error) {
    return <div>Something went wrong! Please try again</div>
  }

  function handleClick () {
    setPage(p => p + 1);
  }

  return (
    <div className="tutorial">
      <h1 className="mb-4 text-2xl">Data Fetching in React</h1>
      <button onClick={handleClick}>Increase Page ({page})</button>
        {isLoading && <div>Loading...</div> }
        {!isLoading && 
          (<ul>
            {posts.map(post => <li key={post.id}>{post.title}</li>)}
        </ul>)
        }
    </div>
  )
}