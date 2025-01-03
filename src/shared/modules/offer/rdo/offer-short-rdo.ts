import { Expose } from 'class-transformer';
import {City, Housing} from '../../../types/index.js';

export class OfferShortRdo {
  @Expose()
  public id!: string;

  @Expose()
    name!: string;

  @Expose({ name: 'createdAt'})
    date!: Date;

  @Expose()
    city!: City;

  @Expose()
    previewImg!: string;

  @Expose()
    isPremium!: boolean;

  @Expose()
    isFavourites!: boolean;

  @Expose()
    rating!: number;

  @Expose()
    housing!: Housing;

  @Expose()
    price!: number;

  @Expose()
    countComments!: number;
}
