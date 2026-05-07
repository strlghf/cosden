import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
}

async function fetchPosts() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=5");
  return res.json()
}

async function updatePostTitle({ id, title }: Post) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
    headers: {
      "Content-Type": "application/json; charset=UTF-8"
    }
  })

  if (!res.ok) {
    throw new Error("Failed to update post")
  }

  return res.json()
}

export function OpUpdate () {
  const queryClient = useQueryClient();

  const { data: posts, isLoading, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updatePostTitle,

    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData(["posts"])
      queryClient.setQueryData(["posts"], (oldPosts: typeof posts) => {
        return oldPosts.map((post: Post) =>
          post.id === updatedPost.id
          ? {...post, title: updatedPost.title}
          : post
        )
      })

      return { previousPosts }
    },

    onError: (err, updatedPost, context) => {
      queryClient.setQueryData(["posts"], context?.previousPosts)
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    }
  });

  const handleUpdatePost = (post: Post) => {
    mutate({
      id: post.id,
      title: post.title + " (Updated)"
    })
  }

  return (
    <div className="section">
      <h2>Optimistic Updates</h2>
      <p>Update UI before server response</p>

      {isLoading && <p>Loading...</p>}
      {isFetching && <p>Background fetching...</p>}
      {isPending && <p>Updating post...</p>}
      {isError && <p>Something went wrong {error.message}</p>}

      {
        posts &&
        posts.map((post: Post) => {
          <div key={post.id} className="card">
            <h4>{post.title}</h4>
            <button onClick={() => handleUpdatePost(post)}>Update Title</button>
          </div>
        })
      }
    </div>
  )
}