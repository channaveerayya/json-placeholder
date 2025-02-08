import axios from 'axios'
import { fetchPhotos, createPhoto, deletePhoto } from './photos-api'
import { createPost, deletePost, fetchPosts, updatePost } from "./posts-api"
const API_URL = 'https://jsonplaceholder.typicode.com'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export {
  fetchPhotos, createPhoto, deletePhoto,
  createPost, deletePost, fetchPosts, updatePost
}