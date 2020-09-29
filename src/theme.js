import { createMuiTheme } from '@material-ui/core/styles'
// import TypoHoopDemo from './fonts/Typo-Hoop_bold-Demo.ttf'

// const typoHoop = {
//   fontFamily: 'Typo Hoop Demo',
//   fontStyle: 'bold',
//   fontWeight: 400,
//   src: `
//     local('Typo Hoop Demo'),
//     local('Typo Hoop Demo-Bold'),
//     url(${TypoHoopDemo}) format('ttf')
//   `,
//   unicodeRange: 'U+0000-00FF',
// }

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
    jet: {
      main: jet,
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: jet,
      secondary: '#fff',
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
