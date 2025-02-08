import React, { useEffect, useState } from "react"
import { loadPhotos } from "../slices/photosSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import useInfiniteScroll from "../hooks/useInfiniteScroll"
import PhotoList from "../components/PhotoList"
import { CircularProgress, Container } from "@mui/material"

const Photos: React.FC = () => {
    const dispatch = useAppDispatch()
    const { photos, loading, totalPhotos, currentPage, pageSize } = useAppSelector((state) => state.photos)
    const [hasMore, setHasMore] = useState(true)

    const loadMore = () => {
        if (photos.length < totalPhotos) {
            dispatch(loadPhotos({ page: currentPage + 1, pageSize }))
        } else {
            setHasMore(false)
        }
    }

    const { handleScroll, containerRef } = useInfiniteScroll(loadMore, loading, hasMore)

    useEffect(() => {
        dispatch(loadPhotos({ page: 1, pageSize }))
    }, [dispatch, pageSize])

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <CircularProgress />
            </Container>
        )
    }
    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <h1>Photos {photos.length} </h1>
            <PhotoList photos={photos} />
            {loading && <p>Loading more...</p>}
            {!hasMore && <p>No more photos available</p>}
        </div>
    )
}

export default Photos
