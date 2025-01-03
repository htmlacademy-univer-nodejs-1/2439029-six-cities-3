import {City} from './city.enum.js';
import {Coordinates} from './coordinates.type.js';

export const cityCoordinates: Map<string, Coordinates> =
    new Map(
      Object.entries({
        [City.Paris]: {latitude: 48.85661, longitude: 2.351499},
        [City.Cologne]: {latitude: 50.938361, longitude: 6.959974},
        [City.Brussels]: {latitude: 50.846557, longitude: 4.351697},
        [City.Amsterdam]: {latitude: 52.370216, longitude: 4.895168},
        [City.Hamburg]: {latitude: 53.550341, longitude: 10.000654},
        [City.Dusseldorf]: {latitude: 51.225402, longitude: 6.776314},
      })
    );

export const DEFAULT_DB_PORT = '27017';
export const DEFAULT_USER_PASSWORD = '123456';
export const MIN_PRICE = 500;
export const MAX_PRICE = 2000;
export const MIN_RATING = 1;
export const MAX_RATING = 5;
export const MIN_COUNT_PEOPlE = 1;
export const MAX_COUNT_PEOPLE = 10;
export const MIN_COUNT_ROOMS = 1;
export const MAX_COUNT_ROOMS = 8;
export const FIRST_WEEK_DAY = 1;
export const LAST_WEEK_DAY = 7;
export const MIN_COUNT_COMMENTS = 0;
export const MAX_COUNT_COMMENTS = 100;
export const JWT_ALGORITHM = 'HS256';
export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.jpg';
export const DEFAULT_STATIC_IMAGES = [
  'default-avatar.jpg',
];

export const STATIC_RESOURCE_FIELDS = [
  'avatar', 'previewImg', 'images'
];

export const CHUNK_SIZE = 16384; // 16KB
