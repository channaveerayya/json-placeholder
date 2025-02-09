import { api } from './api'

export const fetchPosts = async (page: number, pageSize: number) => {
    const response = await api.get(`/posts`, {
        params: {
            _page: page,
            _pageSize: pageSize,
        },
    })
    const totalPosts = parseInt(response?.headers['x-total-count'] || "0", 10) // Assuming API returns total count in headers
    return {
        posts: response.data,
        totalPosts,
        currentPage: page,
    }
}

export const createPost = async (newPost: any) => {
    const response = await api.post("/posts", newPost)
    return response.data
}

export const updatePost = async (id: number, updatedPost: any) => {
    const response = await api.put(`/posts/${id}`, updatedPost)
    return response.data
}

export const deletePost = async (id: number) => {
    await api.delete(`/posts/${id}`)
}
