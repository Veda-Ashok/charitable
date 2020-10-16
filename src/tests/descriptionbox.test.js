import { render } from '@testing-library/react'
import DescriptionBox from '../../src/components/DescriptionBox'
import { mockTrending } from './MockAPI/MockTrending'

describe('DescriptionBox', () => {
  it('Renders description box without crashing', () => {
    const { getAllByText } = render(
      <DescriptionBox orgDetails={mockTrending.projects.project[0]} />
    )
    expect(getAllByText('Donate Here')).toBeTruthy()
  })
})
