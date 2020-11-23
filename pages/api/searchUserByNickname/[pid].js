import { connectToDatabase } from '../../../utils/mongodb'
// const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const users = await db
    .collection('users')
    .findOne(
      { nickname: `${pid.replace(/['"]+/g, '')}` },
      {
        _id: 1,
        email: 0,
      }
    )
    .aggregate([
      {
        $lookup: {
          from: 'organizations',
          localField: 'saved_orgs',
          foreignField: 'gg_id',
          as: 'saved_orgs_docs',
        },
      },
    ])
  res.json(users)
}

// db.orders.aggregate([
//   {
//     $lookup:
//       {
//         from: "inventory",
//         localField: "item",
//         foreignField: "sku",
//         as: "inventory_docs"
//       }
//  }
// ])
