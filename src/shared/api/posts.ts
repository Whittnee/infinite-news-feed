import type { TPost } from "@/shared/types/post";

const LIMIT = 10;

export const fetchPosts = async (skip: number) => {
  const res = await fetch(
    `https://dummyjson.com/posts?limit=${LIMIT}&skip=${skip}`
  );
  if (!res.ok) throw new Error("Failed to fetch posts");
  const data = await res.json();
  return data as { posts: TPost[]; total: number; skip: number; limit: number };
};
