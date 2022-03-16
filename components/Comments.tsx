import { Box } from '@mui/material'
import React from 'react'
import Comment from './Comment'
import { Comment as IComment } from '../interfaces/interfaces'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  comments: IComment[]
}

const Comments = ({ comments }: Props) => {
  return (
    <Box>
      {comments.map((comment) => (
        <Comment key={uuidv4()} comment={comment} />
      ))}
    </Box>
  )
}

export default Comments
