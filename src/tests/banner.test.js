import { render, fireEvent } from '@testing-library/react'
import ProfileBanner from '../components/ProfileBanner'
import axios from 'axios'
jest.mock('axios')

describe('ProfileBanner', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    axios.post.mockReset()
  })

  it('Renders my Profile Banner correctly', () => {
    const { getByText, queryByText, getByAltText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        bio="I love volunteering"
        isMe={true}
        isFollower={false}
      />
    )
    expect(getByText('BJ Johnson')).toBeInTheDocument()
    expect(getByText('I love volunteering')).toBeTruthy()
    expect(getByAltText('BJ Johnson')).toBeTruthy()
    expect(getByText('Edit Profile')).toBeInTheDocument()
    expect(queryByText('Add Follow')).toBeNull()
  })

  it('Renders other peoples Profile Banners correctly', () => {
    const { getByText, queryByText, getByAltText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        bio="I love volunteering"
        isMe={false}
        isFollower={false}
      />
    )
    expect(getByText('BJ Johnson')).toBeInTheDocument()
    expect(getByText('I love volunteering')).toBeTruthy()
    expect(getByAltText('BJ Johnson')).toBeTruthy()
    expect(getByText('Follow')).toBeInTheDocument()
    expect(queryByText('Edit Profile')).toBeNull()
  })

  it('Changes depending on whether or not a user is following - not following', () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({}))
    const { getByText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        bio="I love volunteering"
        isMe={false}
        isFollower={false}
      />
    )
    expect(getByText('Follow')).toBeInTheDocument()
    fireEvent.click(getByText('Follow'))
    expect(axios.post).toHaveBeenCalledTimes(1)
  })

  it('Changes depending on whether or not a user is not following - following', () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({}))

    const { getByText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        bio="I love volunteering"
        isMe={false}
        isFollower={true}
      />
    )
    expect(getByText('Unfollow')).toBeInTheDocument()
    fireEvent.click(getByText('Unfollow'))
    expect(axios.post).toHaveBeenCalledTimes(1)
  })
})
