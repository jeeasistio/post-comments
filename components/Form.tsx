import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import axios, { AxiosError } from 'axios'
import { Comment } from '../interfaces/interfaces'
import { useMutation } from 'react-query'
import { AlertStatus } from '../pages'

interface Props {
  handlePage(page: number): void
  handleStatus(status: AlertStatus): void
  refetch(): void
}

const Form = ({ handlePage, handleStatus, refetch }: Props) => {
  const [content, setContent] = useState('')
  const [isDisabled, setIsDisabled] = useState(false)

  const addCommentFunc = (newComment: Comment) => {
    return axios.post<Comment>('/api/add-comment', newComment)
  }

  const { mutate, isError, error } = useMutation(addCommentFunc, {
    onMutate: () => {
      setIsDisabled(true)
    },
    onSuccess: () => {
      handleStatus({ status: 'success', message: 'Comment Added' })
      setContent('')
      handlePage(1)
      refetch()
    },
    onError: (err: AxiosError) => {
      handleStatus({
        status: 'error',
        message: err?.response?.data.split('content: ')[1]
      })
    },
    onSettled: () => {
      setIsDisabled(false)
    }
  })

  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => setContent(e.target.value)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    return mutate({ content })
  }

  return (
    <Box
      component="form"
      sx={{ display: 'flex', gap: 2, my: 2 }}
      onSubmit={handleSubmit}
    >
      <TextField
        label="Add comment..."
        fullWidth
        variant="outlined"
        value={content}
        error={isError}
        onChange={handleChange}
        disabled={isDisabled}
        helperText={error?.response?.data.split('content: ')[1]}
      />

      <Button disabled={isDisabled} type="submit" variant="contained">
        Comment
      </Button>
    </Box>
  )
}

export default Form
