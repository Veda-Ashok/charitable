import { render } from '@testing-library/react'
import App from '../../pages/index'
import { mockTrending } from './MockAPI/MockTrending'

describe('App', () => {
  it('renders default page without crashing', () => {
    console.log(mockTrending)
    const { getAllByText } = render(<App orgs={mockTrending} />)
    expect(getAllByText('Trending')).toBeTruthy()
  })
})
