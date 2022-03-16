// const mongoose = require('mongoose')
// const { Comment } = require('../interfaces/interfaces')
// const mongoosePaginate = require('mongoose-paginate-v2')
import mongoose from 'mongoose'
import { Comment } from '../interfaces/interfaces'
import mongoosePaginate from 'mongoose-paginate-v2'

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Please enter a content'],
      minlength: [1, 'Please enter a content'],
      maxlength: [255, 'Max character length is 255']
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

commentSchema.plugin(mongoosePaginate)

interface CommentDocument extends mongoose.Document, Comment {}

const commentModel =
  (mongoose.models.Comment as mongoose.PaginateModel<CommentDocument>) ||
  mongoose.model<CommentDocument, mongoose.PaginateModel<CommentDocument>>(
    'Comment',
    commentSchema,
    'comment'
  )

export default commentModel
