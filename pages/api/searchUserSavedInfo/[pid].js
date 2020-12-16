/*
Query  #2: searchUserSavedInfo

Description: Query to find one user based on their nickname,
and return all the info for that user, including all the info for the organizations
they have saved and the activities they have saved.

To test in postman, hit the endpoint /api/searchUserSavedInfo/timmyu

Function Parameters: string: user nickname

Return Value: A JSON object with all the user's info

Query:
db.users.aggregate([
    {$match: {
        nickname: 'krys',
    },
    },
    {$lookup: {
        from: 'organizations',
        localField: 'saved_orgs',
        foreignField: 'gg_id',
        as: 'saved_orgs_docs',
    },
    },
    {$lookup: {
        from: 'activities',
        localField: 'saved_activities',
        foreignField: '_id',
        as: 'saved_activities_docs',
    },
    },
])
*/

import { connectToDatabase, checkInputs, arrayFromCursor } from '../../../utils/mongodb'

export default async (req, res) => {
  const {
    query: { pid },
  } = req
  try {
    const { db } = await connectToDatabase()
    const nickname = pid.replace(/['"]+/g, '')
    await checkInputs(null, null, nickname, [], db)

    const agg = [
      {
        $match: {
          nickname: `${nickname}`,
        },
      },
      {
        $lookup: {
          from: 'organizations',
          localField: 'saved_orgs',
          foreignField: 'gg_id',
          as: 'saved_orgs_docs',
        },
      },
      {
        $lookup: {
          from: 'activities',
          localField: 'saved_activities',
          foreignField: '_id',
          as: 'saved_activities_docs',
        },
      },
      {
        $project: {
          password: 0,
          email: 0,
        },
      },
    ]

    const users = await db.collection('users').aggregate(agg)
    const result = await arrayFromCursor(users)
    res.json(result[0])
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}
