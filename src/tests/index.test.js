jest.mock('next/router')
import { render } from '@testing-library/react'
import App from '../../pages/index'
import { useRouter } from 'next/router'

useRouter.mockReturnValue({ query: { type: 'organizations' } })

describe('App', () => {
  it('renders default page without crashing', () => {
    const { getAllByText } = render(<App />)
    expect(getAllByText('Trending')).toBeTruthy()
  })
})
