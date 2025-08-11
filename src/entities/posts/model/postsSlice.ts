import { fetchPosts } from "@/shared/api/posts";
import type { TPost } from "@/shared/types/post";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPostsThunk = createAsyncThunk("posts/fetchMore", fetchPosts);

interface IPostsState {
  items: TPost[];
  skip: number;
  hasMore: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: IPostsState = {
  items: [],
  skip: 0,
  hasMore: true,
  status: "idle",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        const { posts, total } = action.payload;
        const existing = new Set(state.items.map((p) => p.id));
        const fresh = posts.filter((p) => !existing.has(p.id));

        state.items.push(...fresh);
        state.skip = state.items.length;
        state.hasMore = state.items.length < total;
        state.status = "succeeded";
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
export const { reset } = postsSlice.actions;
