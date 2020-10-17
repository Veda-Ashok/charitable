import { render } from '@testing-library/react'
import TrendingPage from '../../src/Components/TrendingPage'
import { mockTrending } from './MockAPI/MockTrending'

describe('App', () => {
  it('renders default page without crashing', () => {
    console.log(mockTrending)
    const { getAllByText } = render(<TrendingPage orgs={mockTrending} />)
    expect(getAllByText('Loading...')).toBeTruthy()
    expect(getAllByText('Trending')).toBeTruthy()
  })
})
