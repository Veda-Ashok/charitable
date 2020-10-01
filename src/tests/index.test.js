import { render } from '@testing-library/react'
import App from '../../pages/index'

describe('App', () => {
  it('renders default page without crashing', () => {
    const { getByText } = render(<App />)
    expect(getByText('Trending')).toBeInTheDocument()
  })
})
