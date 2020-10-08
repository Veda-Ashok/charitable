import { render, fireEvent } from '@testing-library/react'
import NavigationBar from '../components/NavigationBar'

describe('NavigationBar', () => {
  const user = {
    name: 'boconno9@lion.lmu.edu',
    nickname: 'boconno9',
    picture:
      'https://s.gravatar.com/avatar/cf6070d47355f0a844834883f8aa5dec?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbo.png',
    sub: 'auth0|5f6dc0360ac1990078d09b9c',
    updated_at: '2020-10-08T22:17:37.222Z',
  }

  it('Renders Nav bar correctly', () => {
    const { getByText, getByPlaceholderText, getByAltText } = render(<NavigationBar />)
    expect(getByPlaceholderText('Search…')).toBeTruthy()
    expect(getByText('Timeline')).toBeTruthy()
    expect(getByText('Trending')).toBeTruthy()
    expect(getByText('Trending').closest('a')).toHaveAttribute('href', '/')
    expect(getByText('Profile')).toBeTruthy()
    expect(getByText('Charitable')).toBeInTheDocument()
    expect(getByAltText('charitable-logo')).toBeInTheDocument()
  })

  it('Renders timeline - no user', () => {
    const { getByText } = render(<NavigationBar />)
    expect(getByText('Timeline').closest('a')).toHaveAttribute('href', '/api/login')
  })

  it('Renders timeline correctly - user', () => {
    const { getByText } = render(<NavigationBar user={user} />)
    expect(getByText('Timeline').closest('a')).toHaveAttribute('href', '/timeline')
  })

  it('Profile has correct hrefs - no user', () => {
    const { getByText } = render(<NavigationBar />)
    fireEvent.click(getByText('Profile'))
    expect(getByText('Login').closest('a')).toHaveAttribute('href', '/api/login')
    expect(getByText('My Profile').closest('a')).toHaveAttribute('href', '/api/login')
  })

  it('Profile will display logout button if passed user prop', () => {
    const { getByText } = render(<NavigationBar user={user} />)
    fireEvent.click(getByText('Profile'))
    expect(getByText('Logout').closest('a')).toHaveAttribute('href', '/api/logout')
  })
})
