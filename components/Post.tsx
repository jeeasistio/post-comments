import { Box, Paper, Typography, Alert } from '@mui/material'
import React from 'react'
import { AlertStatus } from '../pages'
import Form from './Form'

interface Props {
  status: AlertStatus
  handlePage(page: number): void
  handleStatus(status: AlertStatus): void
  refetch(): void
}

const Post = ({ status, handlePage, handleStatus, refetch }: Props) => {
  const handleClose = () => {
    handleStatus({ status: undefined, message: '' })
  }

  return (
    <Box sx={{ marginY: 4 }}>
      <Paper sx={{ p: 4 }}>
        {status.status !== undefined && (
          <Alert severity={status.status} onClose={handleClose}>
            {status.message}
          </Alert>
        )}

        <Typography variant="h3" paragraph>
          Post
        </Typography>

        <Typography>
          Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
          consectetur, adipisci velit...
        </Typography>

        <Form
          handlePage={handlePage}
          handleStatus={handleStatus}
          refetch={refetch}
        />
      </Paper>
    </Box>
  )
}

export default Post
