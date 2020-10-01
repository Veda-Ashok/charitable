import { render } from '@testing-library/react'
import NavigationBar from '../components/NavigationBar'

describe('NavigationBar', () => {
  it('Renders Navbar Correctly', () => {
    const { getByText, getByLabelText } = render(<NavigationBar />)
    expect(getByText('Search')).toBeTruthy()
    expect(getByLabelText('Timeline Button')).toBeTruthy()
    expect(getByLabelText('Trending Button')).toBeTruthy()
    expect(getByLabelText('Profile Button')).toBeTruthy()
  })
})
