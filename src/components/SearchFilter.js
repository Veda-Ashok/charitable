import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: '7rem',
  },
}))

export default function SearchFilter(props) {
  const classes = useStyles()

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Filter Search</InputLabel>
        <Select value={props.type} onChange={props.handleChange}>
          <MenuItem value={'organization'}>Organization</MenuItem>
          <MenuItem value={'activity'}>Activity</MenuItem>
          <MenuItem value={'people'}>People</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}

SearchFilter.propTypes = {
  handleChange: PropTypes.func,
  type: PropTypes.string,
}
