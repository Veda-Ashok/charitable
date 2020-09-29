import { render } from '@testing-library/react'
import NavBar from '../components/NavBar'

describe('NavBar', () => {
  it('Renders Navbar Correctly', () => {
    const { getByText } = render(<NavBar />)
    expect(getByText('Search')).toBeTruthy()
  })
})
