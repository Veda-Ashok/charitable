/*
Get-one-entity-by-ID:  getPostById

Description: Find and get a specific post by the post ID.

Function Parameters: String of post ID

Return Value: JSON object that represents the post, poster, image, organization id,
activity id

Query:
db.posts.findOne({
    _id: ObjectId('5fc9eaeca2c42d0180bc202e')
})
*/

import { connectToDatabase } from '../../../utils/mongodb'
const ObjectId = require('mongodb').ObjectID

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  try {
    const { db } = await connectToDatabase()

    const post = await db.collection('posts').findOne({ _id: ObjectId(pid.replace(/['"]+/g, '')) })

    res.json(post)
  } catch (error) {
    console.error(error)
  }
}
