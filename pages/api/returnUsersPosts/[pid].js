import { connectToDatabase } from '../../../utils/mongodb'
// import microCors from 'micro-cors'

// const cors = microCors()
// const ObjectId = require('mongodb').ObjectID

const arrayFromCursor = async (cursor) => {
  //  cursor.forEach is asynchronous!
  const result = []
  await cursor.forEach((item) => result.push(item))
  return result
}

export default async (req, res) => {
  try {
    const {
      query: { pid },
    } = req

    const { db } = await connectToDatabase()

    const agg = [
      {
        $match: {
          poster: `${pid.replace(/['"]+/g, '')}`,
        },
      },
      {
        $lookup: {
          from: 'organizations',
          localField: 'organization_id',
          foreignField: 'gg_id',
          as: 'attached_orgs_docs',
        },
      },
      {
        $lookup: {
          from: 'activities',
          localField: 'activity_id',
          foreignField: '_id',
          as: 'attached_activities_docs',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'poster',
          foreignField: 'nickname',
          as: 'poster_docs',
        },
      },
      {
        $set: {
          pretty_date: { $dateToString: { format: '%m-%d-%Y %H:%M', date: '$date_posted' } },
        },
      },
    ]

    const posts = await db.collection('posts').aggregate(agg).sort({ date_posted: -1 })
    const result = await arrayFromCursor(posts)

    res.json(result)
  } catch (error) {
    console.error(error)
  }
}

// export default cors(handler)
