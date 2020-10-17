import React, { useEffect, useState } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import ProfileBanner from './ProfileBanner'
import { makeStyles } from '@material-ui/core/styles'
import CreatePostBox from './CreatePostBox'
import PropTypes from 'prop-types'
import SavedOrgsScrollview from './SavedOrgsScrollview'
import { searchFeatured } from '..//api/globalGivingApi'
// import auth0 from '../../utils/auth0'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(8),
  },
  postBox: {
    marginTop: theme.spacing(1),
  },
}))

export default function ProfilePage(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [orgs, setOrgs] = useState(null)

  //  FIX THIS TO BE REAL ORGS FROM OUT DATABASE
  useEffect(() => {
    let didCancel = false
    async function fetchData() {
      !didCancel && setIsLoading(true)
      try {
        setIsLoading(true)
        const response = await searchFeatured('featured/projects')
        setOrgs(response)
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      } finally {
        !didCancel && setIsLoading(false)
      }
    }
    fetchData()
    return () => {
      didCancel = true
    }
  }, [])

  // useEffect(async () => {
  //   // Check that a new route is OK
  //   await searchFeatured('featured/projects')
  //     .then((result) => {
  //       setOrgs(result)
  //     })
  //     .catch((e) => console.log(e))
  // }, [])

  const classes = useStyles()
  const name = 'BJ Johnson'
  const bio =
    'I love to volunteer at the food bank and please join me in volunteering if you would like and also add me as a friend.'
  const location = 'Los Angeles, CA'
  const icon = '/media/BJIcon.jpg'
  console.log(orgs)
  return (
    <div className={classes.banner}>
      <NavigationBar page="Profile" user={props.user} />
      <ProfileBanner
        bio={bio}
        name={name}
        location={location}
        isMe={props.isMe}
        icon={icon}
        isFriend={props.isFriend}
      />
      <div className={classes.postBox}>
        <CreatePostBox icon={icon} name={name} />
      </div>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <SavedOrgsScrollview orgs={orgs ? orgs.projects.project : null}></SavedOrgsScrollview>
      )}
    </div>
  )
}

// export async function getServerSideProps({ req }) {
//   // pass the request that comes on the context object into auth0
//   const session = await auth0.getSession(req)
//   let tempOrgs
//   await searchFeatured('featured/projects')
//     .then((result) => {
//       tempOrgs = result
//     })
//     .catch((e) => console.log(e))

//   console.log('IN GET SERVERSIDE PROPS')

//   return {
//     props: {
//       user: session?.user || null,
//       orgs: tempOrgs ? tempOrgs : null,
//     },
//   }
// }

ProfilePage.propTypes = {
  user: PropTypes.object,
  isMe: PropTypes.bool,
  isFriend: PropTypes.bool,
  orgs: PropTypes.object,
}
