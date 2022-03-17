import { Paper, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import React from 'react'
import { Comment } from '../interfaces/interfaces'

interface Props {
  comment: Comment
}

const Comment = ({ comment }: Props) => {
  return (
    <Paper
      sx={{ p: 4, my: 1 }}
      elevation={4}
      component={motion.div}
      initial={{ y: '200%', opacity: 0 }}
      whileInView={{ y: '0%', opacity: 1 }}
      viewport={{ once: true, margin: '20%' }}
      transition={{
        y: { type: 'spring', damping: 15, mass: 0.5, stiffness: 80 },
        opacity: { duration: 0.8 }
      }}
    >
      <Typography variant="h6" paragraph fontWeight="bold">
        Guest
      </Typography>
      <Typography>{comment.content}</Typography>
    </Paper>
  )
}

export default Comment
