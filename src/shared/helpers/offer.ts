import {City, Facility, Housing, Offer, UserTypeEnum} from '../types/index.js';

export function createOffer(offer: string): Offer {
  const offerRow = offer.replace('\n', '').split('\t');
  const [name,
    description,
    date,
    city,
    previewImg,
    images,
    isPremium,
    isFavourites,
    rating,
    housing,
    countRooms,
    countPeople,
    price,
    facilities,
    offerAuthorName,
    offerAuthorAvatar,
    offerAuthorType,
    offerAuthorEmail,
    countComments,
    latitude,
    longitude] = offerRow;
  return {
    name: name,
    description: description,
    date: new Date(date),
    city: city as unknown as City,
    previewImg: previewImg,
    images: images.split(','),
    isPremium: isPremium as unknown as boolean,
    isFavourites: isFavourites as unknown as boolean,
    rating: parseFloat(rating),
    housing: housing as unknown as Housing,
    countRooms: parseInt(countRooms, 10),
    countPeople: parseInt(countPeople, 10),
    price: parseInt(price, 10),
    facilities: facilities.split(',').map((x) => x as unknown as Facility),
    author: {
      name: offerAuthorName,
      avatar: offerAuthorAvatar,
      userType: offerAuthorType as unknown as UserTypeEnum,
      email: offerAuthorEmail,
    },
    countComments: parseInt(countComments, 10),
    coordinates: {latitude: parseFloat(latitude), longitude: parseFloat(longitude)}
  };
}
