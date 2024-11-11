import {User} from '../../../types/index.js';
import {Housing} from '../../../types/index.js';
import {City} from '../../../types/index.js';

export default class CreateOfferDto {
  name!: string;
  description!: string;
  date!: Date;
  city!: City;
  previewImg!: string;
  images!: string[];
  flagIsPremium!: boolean;
  flagIsFavourites!: boolean;
  rating!:  1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
    2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
    3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
    4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
    5;
  housing!: Housing;
  countRooms!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  countPeople!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  price!: number;
  facilities: string[];
  author!: User;
  countComments!: number;
  coordinates!: string;
}
