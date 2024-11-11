import dayjs from 'dayjs';
import {OfferGenerator} from './offer-generator.interface.js';
import {City, cityCoordinates, Housing, MockServerData} from '../../types/index.js';
import {generateRandomValue, getRandomItem, getRandomItems} from '../../helpers/index.js';

const MIN_PRICE = 500;
const MAX_PRICE = 2000;

const MIN_COUNT_PEOPlE = 1;
const MAX_COUNT_PEOPLE = 10;

const MIN_COUNT_ROOMS = 1;
const MAX_COUNT_ROOMS = 8;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const MIN_COUNT_COMMENTS = 0;
const MAX_COUNT_COMMENTS = 100;

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
        const rating = getRandomItem([1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9,
            2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
            3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,
            4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9,
            5]);
        const housing = getRandomItem([Housing.House, Housing.Room, Housing.Hotel, Housing.Apartment]);
        const countRooms = generateRandomValue(MIN_COUNT_ROOMS, MAX_COUNT_ROOMS);
        const countPeople = generateRandomValue(MIN_COUNT_PEOPlE, MAX_COUNT_PEOPLE);
        const price = generateRandomValue(MIN_PRICE, MAX_PRICE);
        const facilities = getRandomItems(['Air_conditioning', 'Baby_seat', 'Fridge',
            'Towels', 'Breakfast', 'Laptop_friendly_workspace', 'Washer']).join('/');
        const userName = getRandomItem(this.mockData.userName);
        const userAvatar = getRandomItem(this.mockData.userAvatar);
        const userEmail = getRandomItem(this.mockData.userEmail);
        const userPassword = getRandomItem(this.mockData.userPassword);
        const userType = getRandomItem(['normal', 'pro']);
        const countComments = generateRandomValue(MIN_COUNT_COMMENTS, MAX_COUNT_COMMENTS);
        const coordinates = [cityCoordinates.get(city)?.latitude, cityCoordinates.get(city)?.longitude].join('/');

        return [
            name, description, date, city, previewImg, images, isPremium, isFavourites, rating, housing, countRooms,
            countPeople, price, facilities, userName, userAvatar, userEmail, userPassword, userType, countComments, coordinates
        ].join('\t');
    }
}
