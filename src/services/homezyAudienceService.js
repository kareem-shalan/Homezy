const audienceItems = [
  {
    id: 'students',
    title: 'For Students',
    description: 'Nearby campuses, verified leases, and roommate matching.',
    aims: [
      'Provide housing near major campuses.',
      'Ensure verified leases and clear terms.',
      'Support compatible roommate matching.',
    ],
  },
  {
    id: 'families',
    title: 'For Families',
    description: 'Safe neighborhoods with schools, parks, and premium amenities.',
    aims: [
      'Prioritize secure and family-ready neighborhoods.',
      'Offer access to schools, parks, and healthcare.',
      'Maintain high-quality community amenities.',
    ],
  },
  {
    id: 'foreigners',
    title: 'For Foreigners',
    description: 'Trusted relocation support and professionally managed options.',
    aims: [
      'Simplify relocation and onboarding support.',
      'Provide trusted legal and rental guidance.',
      'Offer professionally managed living options.',
    ],
  },
]

export const getAudienceItems = async () => {
  await new Promise((resolve) => setTimeout(resolve, 350))
  return audienceItems
}
