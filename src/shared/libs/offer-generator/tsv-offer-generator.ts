import dayjs from 'dayjs';
import {OfferGenerator} from './offer-generator.interface.js';
import {
  City,
  cityCoordinates,
  Facility,
  FIRST_WEEK_DAY,
  Housing,
  LAST_WEEK_DAY,
  MAX_COUNT_COMMENTS,
  MAX_COUNT_PEOPLE,
  MAX_COUNT_ROOMS,
  MAX_PRICE,
  MAX_RATING,
  MIN_COUNT_COMMENTS,
  MIN_COUNT_PEOPlE,
  MIN_COUNT_ROOMS,
  MIN_PRICE,
  MIN_RATING,
  MockServerData,
  UserTypeEnum
} from '../../types/index.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers/index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  public generate(): string {
    const name = getRandomItem(this.mockData.name);
    const description = getRandomItem(this.mockData.description);
    const date = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem([City.Amsterdam, City.Cologne, City.Brussels, City.Paris, City.Hamburg, City.Dusseldorf]);
    const previewImg = getRandomItem(this.mockData.previewImg);
    const images = getRandomItems(this.mockData.images).join('/');
    const isPremium = getRandomItem([true, false]);
    const isFavourites = getRandomItem([true, false]);
    const rating = generateRandomValue(MIN_RATING, MAX_RATING);
    const housing = getRandomItem([Housing.House, Housing.Room, Housing.Hotel, Housing.Apartment]);
    const countRooms = generateRandomValue(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS);
    const countPeople = generateRandomValue(MIN_COUNT_PEOPlE, MAX_COUNT_PEOPLE);
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
    const facilities = getRandomItems([Facility.AirConditioning, Facility.BabySeat, Facility.Fridge, Facility.Breakfast, Facility.Towels, Facility.FriendlyWorkspace, Facility.Laptop, Facility.Washer]).join('/');
    const userName = getRandomItem(this.mockData.users.usernames);
    const userAvatar = getRandomItem(this.mockData.users.avatars);
    const userEmail = getRandomItem(this.mockData.users.emails);
    const userType = getRandomItem([UserTypeEnum.simple, UserTypeEnum.pro]);
    const countComments = generateRandomValue(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);
    const coordinates = [cityCoordinates.get(city)?.latitude, cityCoordinates.get(city)?.longitude].join('/');

    return [
      name, description, date, city, previewImg, images, isPremium, isFavourites, rating, housing, countRooms,
      countPeople, price, facilities, userName, userAvatar, userEmail, userType, countComments, coordinates
    ].join('\t');
  }
}
