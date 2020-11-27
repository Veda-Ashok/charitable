import { connectToDatabase } from '../../../utils/mongodb'
import microCors from 'micro-cors'

// const arrayFromCursor = async (cursor) => {
//   //  cursor.forEach is asynchronous!
//   const result = []
//   await cursor.forEach((item) => result.push(item))
//   return result
// }

const cors = microCors()
// const ObjectId = require('mongodb').ObjectID

// bio, name, profile picture, banner??
const handler = async (req, res) => {
  try {
    const {
      query: { pid },
    } = req

    const { db } = await connectToDatabase()

    const users = await db.collection('users').updateOne(
      { nickname: `${pid.replace(/['"]+/g, '')}` },
      {
        $set: {
          name: req.body.updatedInfo.name,
          bio: req.body.updatedInfo.bio,
        },

        // "profile_picture": req.body.updatedInfo.profileUrl,
        // "banner_picture": req.body.updatedInfo.bannerUrl,
      }
    )
    res.json(users)
  } catch (error) {
    console.error(error)
  }
}

export default cors(handler)
