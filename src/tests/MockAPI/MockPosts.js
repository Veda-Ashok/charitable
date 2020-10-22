import { mockTrending } from './MockTrending'

const name = 'BJ Johnson'
const icon = '/media/BJIcon.jpg'

export const mockPosts = {
  posts: [
    {
      icon: icon,
      name: name,
      time: '10/20/2020 8:00pm',
      typedContent: `A pancake (or hotcake, griddlecake, or flapjack) is a flat cake, often thin and round, 
            prepared from a starch-based batter that may contain eggs, milk and butter. YUM`,
      image: '/media/pancake.png',
    },
    {
      icon: icon,
      name: name,
      time: '10/20/2020 8:00pm',
      typedContent: 'Hi my name is BJ nice to meet everyone ',
    },
    {
      icon: icon,
      name: name,
      time: '10/20/2020 8:00pm',
      typedContent: 'Check out this great organization I found!',
      orgDetails: mockTrending.projects.project[0],
    },
    {
      icon: icon,
      name: name,
      time: '10/20/2020 8:00pm',
      typedContent: 'Going to be volunteering here tomorrow at 3pm!',
      activityDetails: mockTrending.projects.project[3],
    },
  ],
}
