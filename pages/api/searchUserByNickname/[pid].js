import { connectToDatabase } from '../../../utils/mongodb'
// const ObjectId = require('mongodb').ObjectID
const arrayFromCursor = async (cursor) => {
  //  cursor.forEach is asynchronous!
  const result = []
  await cursor.forEach((item) => result.push(item))
  return result
}

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()

  const agg = [
    {
      $match: {
        nickname: `${pid.replace(/['"]+/g, '')}`,
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
  ]

  const users = await db.collection('users').aggregate(agg)
  const result = await arrayFromCursor(users)
  res.json(result[0])
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

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */
// const MongoClient = require('mongodb').MongoClient
// const assert = require('assert')
// const agg = [
//   {
//     $match: {
//       nickname: 'rachel',
//     },
//   },
//   {
//     $lookup: {
//       from: 'organizations',
//       localField: 'saved_orgs',
//       foreignField: 'gg_id',
//       as: 'saved_orgs_docs',
//     },
//   },
// ]

// MongoClient.connect('', { useNewUrlParser: true, useUnifiedTopology: true }, function (
//   connectErr,
//   client
// ) {
//   const coll = client.db('').collection('')
//   coll.aggregate(agg, (cmdErr, result) => {
//     assert.equal(null, cmdErr)
//   })
//   client.close()
// })
