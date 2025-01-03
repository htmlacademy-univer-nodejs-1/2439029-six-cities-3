import {Facility} from './facility.enum.js';
import {User} from './user.type.js';
import {City} from './city.enum.js';
import {Coordinates} from './coordinates.type.js';
import {Housing} from './housing.enum.js';

export type Offer = {
    name: string;
    description: string;
    date: Date;
    city: City;
    previewImg: string;
    images: string[];
    isPremium: boolean;
    isFavourites: boolean;
    rating: number;
    housing: Housing;
    countRooms: number;
    countPeople: number;
    price: number;
    facilities: Facility[];
    author: User;
    countComments: number;
    coordinates: Coordinates;
}
