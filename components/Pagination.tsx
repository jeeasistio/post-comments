import { Stack, Pagination as MuiPagination, Box } from '@mui/material'
import React from 'react'

interface Props {
  page: number
  totalPages: number
  handlePage(newPage: number): void
}

const Pagination = ({ page, totalPages, handlePage }: Props) => {
  const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
    handlePage(value)
  }

  return (
    <Box
      sx={{
        p: 4,
        my: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Stack spacing={2}>
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </Box>
  )
}

export default Pagination
