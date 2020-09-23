import { render } from '@testing-library/react'
import NavBar from '../components/navbar'

describe('NavBar', () => {
  it('Renders Navbar Correctly', () => {
    const { getByText } = render(<NavBar />)
    expect(getByText('Timeline')).toBeTruthy()
    expect(getByText('Profile')).toBeTruthy()
    expect(getByText('Trending')).toBeTruthy()
  })
})
