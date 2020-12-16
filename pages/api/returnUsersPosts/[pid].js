/*
User-readable search function:  returnUsersPost

Description: Query to search for posts by nickname

Test in PostMan by hitting the endpoint api/returnUsersPosts/sam

Function Parameters: a user's nickname

Return Value: Array of posts made by user

Query:
db.posts.aggregate([
    {$match: {
        poster: 'krys',
    },
    },
    {$lookup: {
        from: 'organizations',
        localField: 'organization_id',
        foreignField: 'gg_id',
        as: 'attached_orgs_docs',
    },
    },
    {$lookup: {
        from: 'activities',
        localField: 'activity_id',
        foreignField: '_id',
        as: 'attached_activities_docs',
    },
    },
    {$lookup: {
        from: 'users',
        localField: 'poster',
        foreignField: 'nickname',
        as: 'poster_docs',
    },
    },
    {$set: {
        pretty_date: {$dateToString: {format: '%m-%d-%Y %H:%M', date: '$date_posted'}},
    },
    },
    {$sort: {date_posted: -1}
     }
])
*/

import { connectToDatabase, checkInputs, arrayFromCursor } from '../../../utils/mongodb'

export default async (req, res) => {
  try {
    const {
      query: { pid },
    } = req
    const { db } = await connectToDatabase()
    const nickname = pid.replace(/['"]+/g, '')
    await checkInputs(null, null, nickname, [], db)

    const agg = [
      {
        $match: {
          poster: `${nickname}`,
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
        $project: {
          poster_docs: { password: 0, email: 0 },
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
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}
