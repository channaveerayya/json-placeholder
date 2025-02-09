import React, { useEffect, useState } from "react";
import { loadPosts, createNewPost, removePost } from "../slices/postsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Card, CardContent, Typography, Grid, Container, CircularProgress, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Posts: React.FC = () => {
    const dispatch = useAppDispatch();
    const { posts, loading } = useAppSelector((state) => state.posts);
    const [, setEditMode] = useState<boolean>(false);
    const [newPost, setNewPost] = useState<{ title: string; body: string; userId: number }>({
        title: '',
        body: '',
        userId: 1,
    });

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch]);

    const handleCreatePost = () => {
        dispatch(createNewPost(newPost));
        setNewPost({ title: '', body: '', userId: 1 });
    };

    const handleDeletePost = (id: number) => {
        dispatch(removePost(id));
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
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
                    <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <Card sx={{ display: "flex", flexDirection: "column", backgroundColor: "#f5f5f5", boxShadow: 3, borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="h5" component="div" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body1" color="text.secondary" paragraph>
                                    {post.body}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    User ID: {post.userId}
                                </Typography>
                                <div>
                                    <IconButton onClick={() => setEditMode(true)}><EditIcon /></IconButton>
                                    <IconButton onClick={() => handleDeletePost(post.id)}><DeleteIcon /></IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Posts;
