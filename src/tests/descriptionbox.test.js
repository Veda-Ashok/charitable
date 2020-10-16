import { render } from '@testing-library/react'
import DescriptionBox from '../../src/components/DescriptionBox'

describe('DescriptionBox', () => {
  it('Renders description box without crashing', () => {
    const { getAllByText } = render(<DescriptionBox />)
    expect(getAllByText('Organization')).toBeTruthy()
  })
})
