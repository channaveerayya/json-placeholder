import React from 'react';
import { Grid } from '@mui/material';
import PhotoCard, { Photo } from './PhotoCard'

interface PhotoListProps {
  photos: Photo[];
}

const PhotoList: React.FC<PhotoListProps> = ({ photos }) => {
  return (
    <Grid container spacing={2}>
      {photos.map((photo,i) => (
        <Grid item xs={12} sm={6} md={3} key={i}>
          <PhotoCard {...photo} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PhotoList;