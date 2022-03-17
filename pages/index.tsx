import { AlertColor, Box, Container, Typography } from '@mui/material'
import axios from 'axios'
import { motion } from 'framer-motion'
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import { useQuery } from 'react-query'
import Comments from '../components/Comments'
import Pagination from '../components/Pagination'
import Post from '../components/Post'
import { GetCommentsResult } from '../interfaces/interfaces'
import connectDb from '../lib/connectDb'
import CommentModel from '../models/comment'

export interface AlertStatus {
  status: AlertColor | undefined
  message: string
}

interface Props {
  initialData: string
}

const Home: NextPage<Props> = ({ initialData }) => {
  const parsedInitialData = JSON.parse(initialData)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState<AlertStatus>({
    status: undefined,
    message: ''
  })

  const handlePage = (newPage: number) => {
    setPage(newPage)
  }
  const handleStatus = (newStatus: AlertStatus) => {
    setStatus(newStatus)
  }

  const getComments = async (page: number = 1) => {
    const res = await axios.get<GetCommentsResult>(
      `/api/get-comments?page=${page}`
    )
    return res.data
  }

  const { data, refetch, isError, isLoading } = useQuery(
    ['comments', page],
    () => getComments(page),
    {
      keepPreviousData: true,
      initialData: parsedInitialData,
      refetchOnWindowFocus: false
    }
  )

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <Container maxWidth="lg">
        <Post
          status={status}
          handlePage={handlePage}
          handleStatus={handleStatus}
          refetch={refetch}
        />

        <Box
          sx={{ my: 4, height: 2, backgroundColor: 'grey.300' }}
          component={motion.div}
          initial={{ width: '0%' }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {isError && (
          <Typography align="center" variant="h2">
            Something went wrong
          </Typography>
        )}

        {isLoading && (
          <Typography align="center" variant="h2">
            Loading...
          </Typography>
        )}

        {data !== undefined && (
          <>
            <Comments comments={data?.docs} />
            <Pagination
              page={page}
              handlePage={handlePage}
              totalPages={data?.totalPages}
            />
          </>
        )}
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  await connectDb()

  const comments = await CommentModel.paginate(
    {},
    { page: 1, limit: 10, sort: { created_at: -1 } }
  )

  return {
    props: {
      initialData: JSON.stringify(comments)
    }
  }
}

export default Home
