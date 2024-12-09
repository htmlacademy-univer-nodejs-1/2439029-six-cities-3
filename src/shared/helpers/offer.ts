import {City, Coordinates, Facility, Housing, Offer} from '../types/index.js';

export function createOffer(offerData: string): Offer {
    const [
        name, description, date, city, previewImg, images, isPremium, isFavourites, rating, housing, countRooms,
        countPeople, price, facilities, userName, userAvatar, userEmail, userPassword, userType, countComments, coordinates
    ] = offerData.replace('\n', '').split('\t');

    const user = {
        name: userName,
        avatar: userAvatar,
        email: userEmail,
        password: userPassword,
        userType: userType as "normal" | "pro"
    };

    const [latitude, longitude] = coordinates.split('/');

    const coordinatesObj = {latitude: +latitude, longitude: +longitude} as Coordinates;

    return {
        name,
        description,
        date: new Date(date),
        city: city as City,
        previewImg,
        images: images.split('/'),
        isPremium: Boolean(isPremium),
        isFavourites: Boolean(isFavourites),
        rating: rating as unknown as 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
            2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
            3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
            4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
            5,
        housing: housing as Housing,
        countRooms: countRooms as unknown as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
        countPeople: countPeople as unknown as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
        price: Number.parseInt(price, 10),
        facilities: facilities.split('/').map((item) => getFacilities(item)),
        author: user,
        countComments: Number.parseInt(countComments, 10),
        coordinates: coordinatesObj
    };
}

function getFacilities(name: string): Facility {
  const offer =  {
    name: name
  }
  return offer
}
