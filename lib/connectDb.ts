import { connection, connect } from 'mongoose'

const connectDb = async () => {
  if (connection.readyState < 1) {
    try {
      await connect(process.env.MONGO_URI)
    } catch (err) {
      throw new Error('Cannot connect to the database')
    }
  }

  return
}

export default connectDb
