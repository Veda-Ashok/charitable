// import React from 'react'
// import auth0 from '../../utils/auth0'
// import PropTypes from 'prop-types'
// import { connectToDatabase } from '../../utils/mongodb'

// export default function Sample({ user, users, orgs }) {
//   return (
//     <div>
//       <h1>{users.map((user) => user.email + ', ')}</h1>
//       <h1>{orgs.map((org) => org.name + ', ')}</h1>
//     </div>
//   )
// }

// export async function getServerSideProps({ req }) {
//   const { db } = await connectToDatabase()

//   const users = await db.collection('users').find({}).limit(5).toArray()
//   //$lt less than,
//   const orgs = await db
//     .collection('organization')
//     .find(
//       {
//         $and: [{ name: /love/i }, { mission: /love/i }],
//       },
//       {
//         _id: 0,
//         gg_id: 1,
//         name: 1,
//       }
//     )
//     .limit(1)
//     .sort({ name: 1 })
//     .limit(10)
//     .toArray()
//   // pass the request that comes on the context object into auth0
//   const session = await auth0.getSession(req)
//   return {
//     props: {
//       user: session?.user || null,
//       users: JSON.parse(JSON.stringify(users)),
//       orgs: JSON.parse(JSON.stringify(orgs)),
//     },
//   }
// }

// Sample.propTypes = {
//   user: PropTypes.object,
//   users: PropTypes.array,
//   orgs: PropTypes.array,
// }
