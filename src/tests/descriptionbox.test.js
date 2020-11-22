import { render } from '@testing-library/react'
import DescriptionBox from '../../src/components/DescriptionBox'
import { mockTrending } from './MockAPI/MockTrending'

describe('DescriptionBox', () => {
  it('Renders description box without crashing', () => {
    const { getByText } = render(<DescriptionBox orgDetails={mockTrending.projects.project[0]} />)
    expect(getByText('Mission Statement')).toBeTruthy()
    expect(getByText('Themes')).toBeTruthy()
    expect(getByText('Location')).toBeTruthy()
    expect(getByText('Visit Site')).toBeTruthy()
  })
})
