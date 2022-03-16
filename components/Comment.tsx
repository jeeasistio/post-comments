import { Paper, Typography } from '@mui/material'
import React from 'react'
import { Comment } from '../interfaces/interfaces'

interface Props {
  comment: Comment
}

const Comment = ({ comment }: Props) => {
  return (
    <Paper sx={{ p: 4, my: 1 }} elevation={2}>
      <Typography variant="h6" paragraph fontWeight="bold">Guest</Typography>
      <Typography>{comment.content}</Typography>
    </Paper>
  )
}

export default Comment
