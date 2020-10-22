import { render } from '@testing-library/react'
import TrendingPage from '../../src/Components/TrendingPage'
import { mockTrending } from './MockAPI/MockTrending'

describe('Trending page', () => {
  it('renders trending page with values from mock data', () => {
    const { getByText } = render(<TrendingPage orgs={mockTrending} />)
    expect(getByText('Trending Organizations')).toBeTruthy()
  })
})
