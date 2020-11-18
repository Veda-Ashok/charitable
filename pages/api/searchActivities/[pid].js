import { connectToDatabase } from '../../../utils/mongodb'

export default async (req, res) => {
  const {
    query: { pid },
  } = req

  const { db } = await connectToDatabase()
  const organizations = await db
    .collection('activities')
    // .aggregate([
    //   {
    //     $search: {
    //       autocomplete: {
    //         path: 'title',
    //         query: `${pid}`,
    //         fuzzy: {
    //           maxEdits: 1,
    //         },
    //       },
    //     },
    //   },
    // ])
    .find(
      {
        title: { $regex: `${pid}`, $options: 'i' },
      },
      {
        _id: 0,
        title: 1,
        project_link: 1,
      }
    )
    .limit(10)
    .toArray()

  res.json(organizations)
}