import NavBar from '../src/components/navbar'
import auth0 from '../utils/auth0'
import PropTypes from 'prop-types'

export default function Trending({ user }) {
  return (
    <div className="container">
      <main>
        <nav>
          <div>{user ? <a href="/api/logout">Logout</a> : <a href="/api/login">Login</a>}</div>
        </nav>
        <div>
          <NavBar />
          <h1>Landing Page</h1>
          <h1>Trending</h1>
        </div>
      </main>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  // pass the request that comes on the context object into auth0
  const session = await auth0.getSession(req)
  // For some reason the session is null?? which why it cant find the user
  // However logging out by appending /api/logout works so the user is "logged in"
  return {
    props: {
      user: session?.user || null,
    },
  }
}

// I think user is an object but im not sure since it isnt showing up rip
Trending.propTypes = {
  user: PropTypes.object,
}
