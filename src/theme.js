import { createMuiTheme } from '@material-ui/core/styles'

const jasmine = '#F4D58D'
const flame = '#E7592C'
const jet = '#353238'
const xanadu = '#708D81'

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: flame,
    },
    secondary: {
      main: jasmine,
    },
    error: {
      main: flame,
    },
    success: {
      main: xanadu,
    },
    info: {
      main: jasmine,
    },
    background: {
      default: '#f0f0f0',
    },
    text: {
      primary: jet,
      secondary: '#9e9e9e',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})

export default theme
