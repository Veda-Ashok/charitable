export const mockSearch = {
  result: [
    {
      id: 100,
      type: 'organization',
      name: 'Unicef',
      mission: 'Good things',
      logo_url: 'https://www.globalgiving.org/pfil/organ/189/orglogo.jpg',
      url: 'https://www.unicefusa.org/',
      countries: ['USA', 'Uganda', 'Italy'],
      themes: ['Animals', 'Education'],
    },
    {
      id: 302,
      type: 'user',
      auth0_name: 'samgibson@gmail.com',
      name: 'Sammy',
      profile_picture:
        'https://s.gravatar.com/avatar/cf6070d47355f0a844834883f8aa5dec?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fbo.png',
      banner_picture:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.eukanuba.com%2Fdog-articles%2Fpuppy%2F12-puppy-feeding-tips&psig=AOvVaw17YwsnJ92lTwbx9FgOwnvZ&ust=1603603569678000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPCOg_y-zOwCFQAAAAAdAAAAABAD',
      bio: 'I like puppies and cats.',
    },
    {
      id: 35,
      type: 'activity',
      name: 'Need to Ask Veda About Activity Names',
      organization_id: 100,
      street_address: '393 Sam Rd',
      description: 'This is a car wash for raising money for foodbank',
      city: 'Palo Alto',
      url: 'https://www.unicefusa.org/',
      zipcode: '93840',
      country: 'USA',
      themes: ['Education', 'Social Justice'],
    },
  ],
}
