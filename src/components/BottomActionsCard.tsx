import Avatar from '@mui/joy/Avatar'
import Button from '@mui/joy/Button'
import Card from '@mui/joy/Card'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/joy/CardActions'
import Typography from '@mui/joy/Typography'

export default function BottomActionsCard({ post, setEditMode, handleDeletePost }: {
  handleDeletePost: (id: number) => void, setEditMode: (flag: boolean) => void, post: {
    title: string
    body: string
    id: number
  }
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: 320,
        height: 200,
        overflow: "scroll"
      }}
    >
      <CardActions>
        <Avatar src="https://i.pravatar.cc/40" size="lg" />
        <Button variant="solid" color="primary" disabled onClick={() => setEditMode(true)}>
          Edit
        </Button>
        <Button variant="outlined" color="neutral" onClick={() => handleDeletePost(post.id)}>
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
  )
}
