import { render, fireEvent } from '@testing-library/react'
import ProfileBanner from '../components/ProfileBanner'

describe('ProfileBanner', () => {
  it('Renders my Profile Banner correctly', () => {
    const { getByText, queryByText, getByAltText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        FollowCount={100}
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

  xit('Changes depending on whether or not a user is following - not following', () => {
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
    expect(getByText('Unfollow')).toBeInTheDocument()
  })

  xit('Changes depending on whether or not a user is not following - following', () => {
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
    expect(getByText('Follow')).toBeInTheDocument()
  })
})
