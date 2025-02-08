import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchPhotos, createPhoto, deletePhoto } from '../services/api'

interface Photo {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

interface PhotosState {
    photos: Photo[]
    loading: boolean
    currentPage: number
    totalPhotos: number
    pageSize: number
}

const initialState: PhotosState = {
    photos: [],
    loading: false,
    currentPage: 1,
    totalPhotos: 0,
    pageSize: 20,  // Adjust the page size based on your requirement
}

export const loadPhotos = createAsyncThunk(
    "photos/fetchPhotos",
    async ({ page, pageSize }: { page: number; pageSize: number }) => {
        return await fetchPhotos(page, pageSize)
    }
)

export const addPhoto = createAsyncThunk(
    'photos/createPhoto',
    async (newPhoto: Photo) => {
        return await createPhoto(newPhoto)
    }
)

export const removePhoto = createAsyncThunk(
    'photos/deletePhoto',
    async (id: number) => {
        await deletePhoto(id)
        return id
    }
)


const photosSlice = createSlice({
    name: "photos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadPhotos.pending, (state) => {
                state.loading = true
            })
            .addCase(loadPhotos.fulfilled, (state, action) => {
                // Concatenate the new photos to the existing array
                state.photos = [...state.photos, ...action.payload.photos]
                state.totalPhotos = action.payload.totalPhotos  // Assuming the API returns total photos count
                state.currentPage = action.payload.currentPage
                state.loading = false
            })
            .addCase(loadPhotos.rejected, (state) => {
                state.loading = false
            })
            .addCase(removePhoto.fulfilled, (state, action) => {
                state.photos = state.photos.filter((photo) => photo.id !== action.payload)
            })
    },
})

export default photosSlice.reducer
