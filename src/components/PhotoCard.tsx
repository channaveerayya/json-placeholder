import React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../hooks';
import { removePhoto } from '../slices/photosSlice';  // Import the actions from your photos slice

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const PhotoCard: React.FC<Photo> = ({ id, title, url }) => {

  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      dispatch(removePhoto(id));
    }
  };

  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="https://i.pravatar.cc/140"
            srcSet="https://i.pravatar.cc/140"
            loading="lazy"
            alt={title}
          />
        </AspectRatio>
        <IconButton
          aria-label={title}
          size="md"
          variant="solid"
          color="danger"
          onClick={handleDeleteClick}
          sx={{
            position: 'absolute',
            zIndex: 2,
            borderRadius: '50%',
            right: '1rem',
            bottom: 0,
            transform: 'translateY(50%)',
          }}
        >
          <DeleteIcon />
        </IconButton>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">
          <Link href="#multiple-actions" overlay underline="none">
           {title}
          </Link>
        </Typography>
        <Typography level="body-sm">
          <Link href="#multiple-actions">{url}</Link>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PhotoCard;
