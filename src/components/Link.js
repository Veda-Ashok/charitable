/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import PropTypes from 'prop-types'
import NextLink from 'next/link'
import MuiLink from '@material-ui/core/Link'

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { as, href, ...other } = props

  return (
    <NextLink href={href} as={as}>
      <a ref={ref} {...other} />
    </NextLink>
  )
})

NextComposed.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  prefetch: PropTypes.bool,
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function Link(props) {
  const { href, className: classNameProps, innerRef, naked, ...other } = props

  const className = classNameProps

  if (naked) {
    return <NextComposed className={className} ref={innerRef} href={href} {...other} />
  }

  return (
    <MuiLink component={NextComposed} className={className} ref={innerRef} href={href} {...other} />
  )
}

Link.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
}

/* eslint-disable react/display-name */
export default React.forwardRef((props, ref) => <Link {...props} innerRef={ref} />)
