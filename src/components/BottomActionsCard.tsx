import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

export default function BottomActionsCard({post}:{post :{ 
  title:string
  body :string
}}) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        height:200,
        overflow:"scroll"
      }}
    >
        <CardActions>
      <Avatar src="https://i.pravatar.cc/40" size="lg" />
        <Button  variant="solid"  color="primary">
          Edit
        </Button>
        <Button variant="outlined"color="neutral">
          Delete
        </Button>
      </CardActions>
      <CardContent>
        <Typography level="title-lg"> {post.title}</Typography>
        <Typography level="body-sm">
        {post.body}
        </Typography>
      </CardContent>
    
    </Card>
  );
}
