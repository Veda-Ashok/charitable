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
      _id: ObjectId('5fb3675e723a2200111c8a08'),
      organizationId: 'checking',
      wantToSave: false,
    }

    const { db } = await connectToDatabase()

    // const users = await db.collection('users').updateOne(
    //   {
    //     _id: example._id,
    //   },
    //   [
    //     {
    //       $set: {
    //         saved_orgs: {
    //           $switch: {
    //             branches: [
    //               {
    //                 case: { $in: ['saved_orgs', example.organizationId] },
    //                 then: { $pull: { saved_orgs: example.organizationId } },
    //               },
    //               {
    //                 case: { $nin: ['saved_orgs', example.organizationId] },
    //                 then: { $push: { saved_orgs: example.organizationId } },
    //               },
    //             ],
    //           },
    //         },
    //       },
    //     },
    //   ]
    // )

    // if (!isSaved)
    const users = await db
      .collection('users')
      .updateOne(
        { _id: example._id },
        { $push: { saved_orgs: example.organizationId } },
        { upsert: true }
      )

    res.json(users)
  } catch (error) {
    console.error(error)
  }
}
