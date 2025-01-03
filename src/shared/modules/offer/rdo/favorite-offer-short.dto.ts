import { Expose } from 'class-transformer';
import {City, Housing} from "../../../types/index.js";

export class FavoriteOfferShortDto {
  @Expose()
  public id!: string;

  @Expose()
  name!: string;

  @Expose({ name: 'createdAt'})
  date!: Date;

  @Expose()
  description!: string;

  @Expose()
  city!: City;

  @Expose()
  previewImg!: string;

  @Expose()
  isPremium!: boolean;

  isFavourite = true;

  @Expose()
  rating!: number;

  @Expose()
  housing!: Housing;

  @Expose()
  price!: number;

  @Expose()
  countComments!: number;
}
