import {Expose, Type} from 'class-transformer';
import {City, Coordinates, Facility, Housing, User} from '../../../types/index.js';
import {UserRdo} from '../../user/rdo/user.rdo.js';

export class OfferRdo {
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
    images!: string[];

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

  @Expose()
    countRooms!: number;

  @Expose()
    countPeople!: number;

  @Expose()
    facilities!: Facility[];

  @Expose({name: 'userId'})
  @Type(() => UserRdo)
    author!: User;

  @Expose()
    coordinates!: Coordinates;
}
