import React from 'react'
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

export default function SearchFilter() {
  const classes = useStyles()
  const [type, setType] = React.useState('organization')

  const handleChange = (e) => {
    setType(e.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-helper-label">Filter Results</InputLabel>
        <Select value={type} onChange={handleChange}>
          <MenuItem value={'organization'}>Organization</MenuItem>
          <MenuItem value={'activity'}>Activity</MenuItem>
          <MenuItem value={'people'}>People</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
