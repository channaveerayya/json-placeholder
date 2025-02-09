import { api } from './api'

export async function fetchPosts() {
  const res = await api.get("/posts");
  return res.data;
}

export const createPost = async (newPost: any) => {
    const response = await api.post("/posts", newPost);
    return response.data;
};

export const updatePost = async (id: number, updatedPost: any) => {
    const response = await api.put(`/posts/${id}`, updatedPost);
    return response.data;
};

export const deletePost = async (id: number) => {
    await api.delete(`/posts/${id}`);
};
