import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import {Offer, City, Housing, Facilities, User, Coordinates} from '../../types/index.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([name, description, date, city, previewImg, images, IsPremium,
              IsFavourites, rating, housing, countRooms, countPeople, price,
              facilities, author, countComments, coordinates]) => ({
        name: name,
        description: description,
        date: new Date(date),
        city: city as City,
        previewImg: previewImg,
        images: images.split('/'),
        IsPremium: IsPremium as unknown as boolean,
        IsFavourites: IsFavourites as unknown as boolean,
        rating: rating as unknown as  1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
          2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
          3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
          4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
          5,
        housing: housing as Housing,
        countRooms: countRooms as unknown as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
        countPeople: countPeople as unknown as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
        price: Number.parseInt(price, 10),
        facilities: facilities as Facilities,
        author: author as unknown as User,
        countComments: Number.parseInt(countComments, 10),
        coordinates: coordinates.split('/') as unknown as Coordinates,
      }));
  }
}
