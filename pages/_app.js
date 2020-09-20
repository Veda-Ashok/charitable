import PropTypes from 'prop-types'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
}

export default MyApp
