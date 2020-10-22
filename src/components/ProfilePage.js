import React, { useEffect, useState } from 'react'
import NavigationBar from '../../src/components/NavigationBar'
import ProfileBanner from './ProfileBanner'
import { makeStyles } from '@material-ui/core/styles'
import CreatePostBox from './CreatePostBox'
import PropTypes from 'prop-types'
import Post from './Post'
import { mockTrending } from '../tests/MockAPI/MockTrending'
import SavedOrgsScrollview from './SavedOrgsScrollview'
import { searchFeatured } from '../apicalls/globalGivingApi'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(8),
  },
  postBox: {
    marginTop: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  post: {
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
    },
  },
  content: {
    display: 'flex',
  },
  savedOrg: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(1),
  },
}))

export default function ProfilePage(props) {
  const [orgs, setOrgs] = useState('')

  useEffect(async () => {
    // Check that a new route is OK
    await searchFeatured('featured/projects')
      .then((result) => {
        setOrgs(result)
      })
      .catch((e) => console.log(e))
  }, [])

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
      <div className={classes.content}>
        <div>
          <div className={classes.postBox}>
            <CreatePostBox icon={icon} name={name} />
          </div>
          <div className={classes.post}>
            <Post
              icon={icon}
              name={name}
              time={'10/20/2020 8:00pm'}
              typedContent={`A pancake (or hotcake, griddlecake, or flapjack) is a flat cake, often thin and round, 
            prepared from a starch-based batter that may contain eggs, milk and butter. YUM`}
              image={'/media/pancake.png'}
            />
          </div>
          <div className={classes.post}>
            <Post
              icon={icon}
              name={name}
              time={'10/20/2020 8:00pm'}
              typedContent={'Hi my name is BJ nice to meet everyone '}
              image={null}
            />
          </div>
          <div className={classes.post}>
            <Post
              icon={icon}
              name={name}
              time={'10/20/2020 8:00pm'}
              typedContent={'Check out this great organization I found!'}
              orgDetails={mockTrending.projects.project[0]}
            />
          </div>
          <div className={classes.post}>
            <Post
              icon={icon}
              name={name}
              time={'10/20/2020 8:00pm'}
              typedContent={'Going to be volunteering here tomorrow at 3pm!'}
              activityDetails={mockTrending.projects.project[3]}
            />
          </div>
        </div>
        <div className={classes.savedOrg}>
          <SavedOrgsScrollview orgs={orgs ? orgs.projects.project : null}></SavedOrgsScrollview>
        </div>
      </div>
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
