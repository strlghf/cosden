import { keepPreviousData, useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Post {
  id: number;
  title: string;
  body: string;
}

async function fetchPosts(page) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
  return res.json()
}

async function fetchInfinitePosts({ pageParam = 1 }) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=5`);
  return res.json()
}

export function PaginationInfQuery () {
  return (
    <div className="section">
      <h2>Pagination & Infinite Queries</h2>
      <p>Pagination</p>
      
      <PaginationExample />
    </div>
  )
}

function PaginationExample () {
  const [page, setPage] = useState(1);

  const { data: posts, isLoading, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData
  })

  const handlePrev = () => {
    setPage(prev => Math.max(prev - 1, 1))
  }

  const handleNext = () => {
    setPage(prev => prev + 1)
  }

  return (
    <div className="card">
      <h3>Pagination Exe</h3>
      <p>Normal query, page number part of the query key</p>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={handlePrev} disabled={page === 1}>Prev page</button>
        <button onClick={handleNext}>Next page</button>
      </div>

      <p>Current page: {page}</p>

      {isLoading && <p>Loading...</p>}
      {isFetching && <p>Fetching...</p>}
      {isPlaceholderData && (
        <p>Showing previous page while loading new one...</p>
      )}

      {posts && posts.map((post: Post) => (
        <div key={post.id} className="card">
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  )
}

function InfQuery () {
  const { data, isLoading, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["infinite-posts"],
    queryFn: fetchInfinitePosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 5) return undefined;
      return allPages.length + 1
    }
  })

  const handleClick = () => {
    fetchNextPage()
  }

  return (
    <div className="card">
      <h3>Inf Query</h3>
      <p>This loads one page at a time and appends the new results to the bottom</p>

      {isLoading && <p>Loading...</p>}
      {isFetching && !isFetchingNextPage && <p>Background fetching...</p>}

      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.map((post: Post) => (
            <div key={post.id} className="card">
              <h4>{post.title}</h4>
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      ))}

      <button onClick={handleClick} disabled={!hasNextPage || isFetchingNextPage}>
        {isFetchingNextPage ? "Loading more..." : "Load More"}
      </button>

      {!hasNextPage && <p>No more posts to load.</p>}
    </div>
  )
}