/*
Creation: createPost

Description: This allows a user to create a post with a message that they desire. For the mongo shell command below you will create a post,
with some text so the function parameter is a string. However in our app the posts can also post photos which is dependent on our third party API
cloudinary which would be very difficult.
So for our mongo shell command we create a simple post that contains some text. Thus the parameters for our mongo shell command is just two strings
the poster, and the typed content.

We HIGHLY RECOMMEND that you test this api call from the GUI not by endpoint. You can make a charitable account and create a post through the frontend- it
will be easy to make sure the input is formdata as expected. Also our frontend makes sure that users can only attach images as files,
and provides some text limitations, and also has a modal that shows up when the user doesn't input any text.


You can also test in Postman!
Select body, then form data, and enter in all the fields, such as: poster, image, organization_id, activity_id, typed_content, and date_posted.

Return Value: JSON Object confirming if the post was successfully created
Query:
db.posts.insertOne({
    poster: 'krys',
    image: null,
    organization_id: null,
    activity_id: null,
    typed_content: 'found a new amazing opportunity! : )',
    date_posted: new Date(),
})
*/

import { connectToDatabase } from '../../utils/mongodb'
import microCors from 'micro-cors'
import formidable from 'formidable'
import { v2 as cloudinary } from 'cloudinary'

const cors = microCors()
const ObjectId = require('mongodb').ObjectID

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler = async (req, res) => {
  try {
    const { db } = await connectToDatabase()
    const form = new formidable.IncomingForm()

    const formData = await new Promise(function (resolve, reject) {
      form.parse(req, function (err, fields, files) {
        if (err) {
          reject(err)
          return
        }
        resolve([fields, files])
      })
    })

    let photo = null
    const files = formData[1]
    const fields = formData[0]
    if (Object.keys(files).length !== 0) {
      const image = await cloudinary.uploader.upload(files.image.path, {
        width: 512,
        height: 350,
        crop: 'fill',
      })
      photo = image.secure_url
    }

    const activity_id = fields.activity_id === 'null' ? null : ObjectId(fields.activity_id)
    const post = await db.collection('posts').insertOne({
      poster: fields.poster,
      image: photo === 'null' ? null : photo,
      organization_id: fields.organization_id === 'null' ? null : fields.organization_id,
      activity_id: activity_id,
      typed_content: fields.typed_content,
      date_posted: new Date(),
    })
    res.json(post)
  } catch (error) {
    console.error(error)
  }
}

export default cors(handler)
