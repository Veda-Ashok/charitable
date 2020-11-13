import auth0 from '../../utils/auth0'

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' })
  } catch (error) {
    if (
      error.error === 'access_denied' &&
      error.error_description === 'User did not authorize the request'
    ) {
      //this handles if the user declines to share their info with auth0 on signup
      res.setHeader('location', '/')
      res.statusCode = 302
      res.end()
    } else {
      console.error(error)
      res.status(error.status || 400).end(error.message)
    }
  }
}
