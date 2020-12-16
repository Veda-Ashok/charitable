/*
Get-one-entity-by-ID:  getPostById

Description: Find and get a specific post by the post ID.

Test in PostMan by by hitting the endpoint api/getPostByID/5fd95958d6cd09c8567372d2

Function Parameters: String of post ID

Return Value: JSON object that represents the post, poster, image, organization id,
activity id

Query:
db.posts.findOne({
    _id: ObjectId('5fd95958d6cd09c8567372d2')
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

    const id = ObjectId(pid.replace(/['"]+/g, ''))

    const post = await db.collection('posts').findOne({ _id: id })

    res.json(post)
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}
