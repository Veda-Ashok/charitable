import NavigationBar from './NavigationBar'
import SearchScrollview from './SearchScrollview'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import { mockSearch } from '../tests/MockAPI/MockSearch'
import Paper from '@material-ui/core/Paper'
import React /*{ useState, useEffect }*/ from 'react'
import { makeStyles } from '@material-ui/core/styles'
//import Loading from './Loading'

const useStyles = makeStyles((theme) => ({
  banner: {
    marginTop: theme.spacing(11),
  },
  title: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.common.white,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  results: {
    padding: '1rem',
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
}))

export default function SearchPage(props) {
  const classes = useStyles()
  // const [isLoading, setIsLoading] = useState(false)
  // const [results, setResults] = useState(null)
  // const [error, setError] = useState(undefined)

  // setResults(mockSearch)

  // useEffect(() => {
  //   let didCancel = false
  //   async function fetchData() {
  //     !didCancel && setIsLoading(true)
  //     try {
  //       setIsLoading(true)
  //       const response = mockSearch
  //       setResults(response)
  //       setIsLoading(false)
  //     } catch (error) {
  //       setError(error.statusText)
  //     } finally {
  //       !didCancel && setIsLoading(false)
  //     }
  //   }
  //   fetchData()
  //   return () => {
  //     didCancel = true
  //   }
  // }, [])

  return (
    <div>
      <NavigationBar user={props.user} page="Search" />
      <div className={classes.banner}>
        <Paper className={classes.title}>
          <Typography variant="h5">Search Results for {props.searchedWord}</Typography>
        </Paper>
      </div>
      <Paper className={classes.results}>
        <div>
          <SearchScrollview className={classes.scrollView} results={mockSearch} />
        </div>
      </Paper>
    </div>
  )
}

SearchPage.propTypes = {
  user: PropTypes.object,
  searchedWord: PropTypes.string,
}
