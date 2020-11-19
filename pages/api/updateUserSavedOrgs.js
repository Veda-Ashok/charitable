import { connectToDatabase } from '../../utils/mongodb'

const ObjectId = require('mongodb').ObjectID

// {
//   $switch: {
//      branches: [
//         { case: "this is true", then: "first case" },
//         { case: false, then: "second case" }
//      ],
//      default: "Did not match"
//   }
// }

export default async (req, res) => {
  // const {
  //   query: { pid },
  // } = req
  try {
    const example = {
      _id: ObjectId('5fb4bd5ac478970011f749bc'),
      organizationId: 'love',
      wantToSave: false,
    }

    const { db } = await connectToDatabase()

    // if (!isSaved)
    const users = await db
      .collection('users')
      .updateOne({ _id: example._id }, [{ $pull: { saved_orgs: example.organizationId } }])

    res.json(users)
  } catch (error) {
    console.error(error)
  }
}
