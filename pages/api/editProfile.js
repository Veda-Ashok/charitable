// import { connectToDatabase } from '../../utils/mongodb'
// import microCors from 'micro-cors'

// const cors = microCors()
// const ObjectId = require('mongodb').ObjectID

// // bio, name, profile picture, banner??
// const handler = async (req, res) => {
//   try {
//     const { db } = await connectToDatabase()

//     const users = await db
//       .collection('users')
//       .updateOne(
//         { _id: ObjectId(req.body.userId) },
//         { $addToSet:
//             "name": req.body.result.name,
//             "bio": req.body.result.name,
//             "profile_picture": req.body.result.profileUrl,
//             "banner_picture": req.body.result.bannerUrl,
//         }
//       )

//     res.json(users)
//   } catch (error) {
//     console.error(error)
//   }
// }

// export default cors(handler)
