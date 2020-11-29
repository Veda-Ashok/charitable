import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

const handler = async (res) => {
  try {
    const { db } = await connectToDatabase()

    const posts = await db
      .collection('posts')
      .find({ poster: ObjectId(res.body.userId) })
      .toArray()

    res.json(posts)
  } catch (error) {
    console.error(error)
  }
}
export default cors(handler)
