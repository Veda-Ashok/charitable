/*
Creation: createPost

Description: This allows a user to create a post with a message that they desire. For the mongo shell command below you will create a post,
with some text so the function parameter is a string. However, in our app, the posts can also post photos which is dependent on our third party API
cloudinary, which would be very difficult. 

So for our mongo shell command we create a simple post that contains some text. Thus the parameters for our mongo shell command is just two strings
the poster, and the typed content.

You can test this API call from the GUI or endpoint (in Postman). You can make a charitable account and create a post through the frontend- it
will be easy to make sure the input is form-data as expected. Also, our frontend makes sure that users can only attach png/jpeg,
and provides some text limitations, and also has a modal that shows up when the user doesn't input any text.

You can also test in Postman!
Using the endpoint: https://charitable.vercel.app/api/createPost
Select body, then form data, and enter in all the fields 
(NOTE: All fields except for the image should be text value, so no quotes):
poster: krys
image: *You can choose to attach an image if you would like using the 'Select File' option in the image field of Postman*
organization_id: null OR 62
activity_id: null OR 5fba1bd390f1ca3ae93a5ffc 
typed_content: Dondi's first post!

Function Parameters: Array formData that contains the String fields: poster, image, organization_id, activity_id, typed_content

Return Value: JSON Object confirming if the post was successfully created

Query:
db.posts.insertOne({
    poster: 'krys',
    image: null,
    organization_id: null,
    activity_id: null,
    typed_content: 'found a new amazing opportunity! : )',
    date_posted: new Date(),
});
*/

import { connectToDatabase, checkInputs } from '../../utils/mongodb'
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

    const files = formData[1]
    const fields = formData[0]
    console.log('fields', fields)

    if (fields.typed_content === undefined || fields.typed_content === '') {
      throw new Error('Posts must have text content')
    }
    if (fields.typed_content.length > 3000) {
      throw new Error('Post is too long')
    }
    const activity_id =
      fields.activity_id === 'null'
        ? null
        : fields.activity_id === undefined
        ? undefined
        : ObjectId(fields.activity_id)
    const organization_id = fields.organization_id === 'null' ? null : fields.organization_id
    await checkInputs(activity_id, organization_id, fields.poster, files, db)
    let photo = null
    if (Object.keys(files).length !== 0 && files.image.type !== null) {
      const image = await cloudinary.uploader.upload(files.image.path, {
        width: 512,
        height: 350,
        crop: 'fill',
      })
      photo = image.secure_url
    }

    const post = await db.collection('posts').insertOne({
      poster: fields.poster,
      image: photo === 'null' ? null : photo,
      organization_id: organization_id,
      activity_id: activity_id,
      typed_content: fields.typed_content,
      date_posted: new Date(),
    })
    res.json(post)
  } catch (error) {
    console.log(error)
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.json({ errorName: error.name, errorMessage: error.message })
  }
}

export default cors(handler)
