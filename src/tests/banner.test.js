import { render, fireEvent } from '@testing-library/react'
import ProfileBanner from '../components/ProfileBanner'

describe('ProfileBanner', () => {
  it('Renders my Profile Banner correctly', () => {
    const { getByText, queryByText, getByAltText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        friendCount={100}
        bio="I love volunteering"
        location="Los Angeles"
        isMe={true}
        isFriend={false}
      />
    )
    expect(getByText('BJ Johnson')).toBeInTheDocument()
    expect(getByText('I love volunteering')).toBeTruthy()
    expect(getByText('Los Angeles')).toBeTruthy()
    expect(getByAltText('BJ Johnson')).toBeTruthy()
    expect(getByText('100 Friends')).toBeTruthy()
    expect(getByText('Edit Profile')).toBeInTheDocument()
    expect(queryByText('Add Friend')).toBeNull()
  })

  it('Renders other peoples Profile Banners correctly', () => {
    const { getByText, queryByText, getByAltText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        friendCount={100}
        bio="I love volunteering"
        location="Los Angeles"
        isMe={false}
        isFriend={false}
      />
    )
    expect(getByText('BJ Johnson')).toBeInTheDocument()
    expect(getByText('I love volunteering')).toBeTruthy()
    expect(getByText('Los Angeles')).toBeTruthy()
    expect(getByAltText('BJ Johnson')).toBeTruthy()
    expect(getByText('100 Friends')).toBeTruthy()
    expect(getByText('Add Friend')).toBeInTheDocument()
    expect(queryByText('Edit Profile')).toBeNull()
  })

  it('Changes depending on whether or not a user is a friend - not friends', () => {
    const { getByText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        friendCount={100}
        bio="I love volunteering"
        location="Los Angeles"
        isMe={false}
        isFriend={false}
      />
    )
    expect(getByText('Add Friend')).toBeInTheDocument()
    fireEvent.click(getByText('Add Friend'))
    expect(getByText('Delete Friend')).toBeInTheDocument()
  })

  it('Changes depending on whether or not a user is a friend - not friends', () => {
    const { getByText } = render(
      <ProfileBanner
        name="BJ Johnson"
        icon="/media/BJIcon.jpg"
        friendCount={100}
        bio="I love volunteering"
        location="Los Angeles"
        isMe={false}
        isFriend={true}
      />
    )
    expect(getByText('Delete Friend')).toBeInTheDocument()
    fireEvent.click(getByText('Delete Friend'))
    expect(getByText('Add Friend')).toBeInTheDocument()
  })
})
