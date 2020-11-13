let api = 'localhost:3000/api'

const apiHost = (host) => {
  api = host
}
const urlFor = (resource) => `${api}/${resource}`

const HTTP_OK = 200

const throwResponseError = (response) => {
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const emitNativeError = (error) => {
  throw error
}

const statusCheck = (successStatuses) => (response) => {
  if (successStatuses.includes(response.status)) {
    return response
  } else {
    throwResponseError(response)
  }
}

const okCheck = statusCheck([HTTP_OK])

const query = (resource, params) =>
  fetch(`${urlFor(resource)}/${params}`, {})
    .then(okCheck, emitNativeError)
    .then((response) => response.json())

// https://api.globalgiving.org/api/publicprojectservice/?featured%2Fprojects%3F=e9d51f98-4e9f-4dcb-8df9-45f2ae9abff9
// https://api.globalgiving.org/api/public/projectservice/featured/projects?api_key=e9d51f98-4e9f-4dcb-8df9-45f2ae9abff9

//const searchGifs = params => query('gifs/search', params)
// eslint-disable-next-line prettier/prettier
const searchUsers = (params) => query('searchUsers', params)

// export default function searchFeatured() {
//   return query('projectservice/', 'featured/projects')
// }

export { apiHost, searchUsers }
