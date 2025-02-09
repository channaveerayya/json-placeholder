import React, { useEffect, useState } from "react";
import { loadPosts, createNewPost, removePost } from "../slices/postsSlice";
import { useAppDispatch, useAppSelector, useDebounce, useInfiniteScroll } from "../hooks";
import { Typography, Grid, Container, CircularProgress, TextField, Button } from "@mui/material";
import BottomActionsCard from "../components/BottomActionsCard"

const Posts: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, totalPosts, currentPage, pageSize } = useAppSelector((state) => state.posts)
    const [, setEditMode] = useState<boolean>(false);
    const [newPost, setNewPost] = useState<{ title: string; body: string; userId: number }>({
        title: '',
        body: '',
        userId: 1,
    });
    const [hasMore, setHasMore] = useState(true)

    const loadMore = () => {
        if (posts.length < totalPosts) {
            dispatch(loadPosts({ page: currentPage + 1, pageSize }))
        } else {
            setHasMore(false)
        }
    }
    const debouncedLoadMore = useDebounce(loadMore, 500);
    const { handleScroll, containerRef } = useInfiniteScroll(debouncedLoadMore, loading, hasMore)

    useEffect(() => {
        dispatch(loadPosts({ page: 1, pageSize }))
    }, [dispatch, pageSize])


    const handleCreatePost = () => {
        dispatch(createNewPost(newPost));
        setNewPost({ title: '', body: '', userId: 1 });
    };

    const handleDeletePost = (id: number) => {
        dispatch(removePost(id));
    };

    return (
        <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <Container maxWidth="xl" sx={{ paddingTop: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Posts
            </Typography>

            <TextField
                label="Title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
            />
            <TextField
                label="Body"
                value={newPost.body}
                onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleCreatePost}>Create Post</Button>
         
            <Grid container spacing={4} sx={{ pt: 4 }}>
                {posts.map((post) => (
                    <Grid item xs={12} sm={6} md={3} key={post.id}>
                        <BottomActionsCard post={post} handleDeletePost={handleDeletePost} setEditMode={setEditMode}/>
                    </Grid>
                ))}
            </Grid>
            {hasMore && <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
                <CircularProgress />
            </Container>}
            {!hasMore && <p>No more Posts available</p>}
        </Container>
        </div>
    );
};

export default Posts;
