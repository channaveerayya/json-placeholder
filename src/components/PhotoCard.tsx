import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useAppDispatch } from '../hooks';
import { removePhoto } from '../slices/photosSlice';  // Import the actions from your photos slice

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const PhotoCard: React.FC<Photo> = ({ albumId, id, title, url }) => {
  const dispatch = useAppDispatch();
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newUrl, setNewUrl] = useState(url);

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      dispatch(removePhoto(id));
    }
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://i.pravatar.cc/140"
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Album ID: {albumId}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
        </Typography>
      </CardContent>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 16px 16px' }}>
       
        <IconButton onClick={handleDeleteClick} color="secondary">
          <Delete /> DELETE
        </IconButton>
      </div>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Photo</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            id="url"
            label="URL"
            type="text"
            fullWidth
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog}>Cancel</Button>
        
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PhotoCard;
