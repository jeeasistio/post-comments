import type { NextApiRequest, NextApiResponse } from 'next'
import connectDb from '../../lib/connectDb'
import CommentModel from '../../models/comment'
import { MongooseError } from 'mongoose'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDb()

  const { page } = req.query

  return CommentModel.paginate(
    {},
    { page: +page as number, limit: 10, sort: { created_at: -1 } }
  )
    .then((comments) => res.status(200).json(comments))
    .catch((err: MongooseError) => res.status(400).json(err.message))
}
