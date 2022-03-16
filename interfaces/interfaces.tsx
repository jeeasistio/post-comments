import { PaginateResult } from 'mongoose'

export interface Comment {
  content: string
}

export interface GetCommentsResult extends PaginateResult<Comment> {}
