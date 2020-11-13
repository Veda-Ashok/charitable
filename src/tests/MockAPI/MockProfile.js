import { mockTrending } from './MockTrending'
import { mockPosts } from './MockPosts'

export const mockProfile = {
  //posts and saved_orgs will actually be an array of their ids
  result: [
    {
      name: 'BJ Johnson',
      bio:
        'I love to volunteer at the food bank and please join me in volunteering if you would like and also follow me.',
      profile_picture: '/media/BjIcon.jpg',
      posts: mockPosts,
      saved_orgs: mockTrending,
      banner_picture: '/media/Banner.jpg',
    },
  ],
}

export async function searchProfile() {
  return mockProfile
}
