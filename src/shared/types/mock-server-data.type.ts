export type MockServerData = {
    name: string[];
    description: string[];
    previewImg: string[];
    images: string[];
  users: {
    usernames: string[],
    avatars: string[],
    emails: string[],
  }
  coordinates: {
    latitude: number[],
    longitude: number[]
  },
};
