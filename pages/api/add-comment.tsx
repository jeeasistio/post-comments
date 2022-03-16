import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../lib/connectDb'
import CommentModel from '../../models/comment'
import { MongooseError } from 'mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb()

  const { content } = req.body

  const newComment = new CommentModel({ content })

  return newComment
    .save()
    .then((newComment) => res.status(200).json(newComment))
    .catch((err: MongooseError) => res.status(400).json(err.message))
}
