import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { createPost, deletePost, fetchPosts, updatePost } from "../services/api"


interface post {
    userId: number
    id: number
    title: string
    body: string
}

interface postsState {
    posts: post[]
    loading: boolean,
    currentPage: number
    totalPosts: number
    pageSize: number
}

const initialState: postsState = {
    posts: [],
    loading: false,
    currentPage: 1,
    totalPosts: 0,
    pageSize: 20,  
}

export const loadPosts = createAsyncThunk(
    "photos/fetchPosts",
    async ({ page, pageSize }: { page: number; pageSize: number }) => {
        return await fetchPosts(page, pageSize)
    }
)

export const createNewPost = createAsyncThunk('posts/createPost', async (newPost: any) => {
    return await createPost(newPost)
})

export const editPost = createAsyncThunk('posts/updatePost', async (data: { id: number, updatedPost: any }) => {
    return await updatePost(data.id, data.updatedPost)
})

export const removePost = createAsyncThunk('posts/deletePost', async (id: number) => {
    return await deletePost(id)
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(loadPosts.fulfilled, (state, action) => {
                state.posts = [...state.posts, ...action.payload.posts]
                state.totalPosts = action.payload.totalPosts 
                state.currentPage = action.payload.currentPage
                state.loading = false
            })
            // Create post
            .addCase(createNewPost.fulfilled, (state, action) => {
                state.posts.unshift(action.payload)
            })
            // Edit post
            .addCase(editPost.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id)
                if (index !== -1) {
                    state.posts[index] = action.payload
                }
            })
            // Delete post
            .addCase(removePost.fulfilled, (state, action) => {
                const postIdToDelete = action.meta.arg // The ID of the post to be deleted
                state.posts = state.posts.filter(post => post.id !== postIdToDelete)
            })
    },
})

export default postsSlice.reducer
