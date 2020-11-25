import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase()

    const activity_id = req.body.activity_id ? ObjectId(req.body.activity_id) : null
    const post = await db.collection('posts').insertOne({
      poster: ObjectId(req.body.poster),
      image: req.body.image,
      organization_id: req.body.organization_id,
      activity_id: activity_id,
      typed_content: req.body.typed_content,
      date_posted: new Date(),
    })
    res.json(post)
  } catch (error) {
    console.error(error)
  }
}

export default cors(handler)
