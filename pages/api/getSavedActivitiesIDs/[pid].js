import { connectToDatabase } from '../../../utils/mongodb'
const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  try {
    const id = ObjectId(pid.replace(/['"]+/g, ''))
    const { db } = await connectToDatabase()

    const users = await db.collection('users').findOne(
      { _id: id },
      {
        projection: {
          _id: 0,
          saved_activities: 1,
        },
      }
    )

    res.json(users ? users.saved_activities : [])
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorCode: error.message })
    // res.status(400).json({ name: 'Next.js' })
    // console.log('type', typeof error)
    // // res.json(error.message)
  }
}
