import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {City} from '../../types/index.js';
import {Housing} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import {User} from '../../types/index.js';
import {Coordinates} from '../../types/index.js';
import {FacilitiesEntity} from "../facilities/index.js";

const {prop, modelOptions} = typegoose;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: [10, 'Min length for name is 10'],
    maxlength: [100, 'Min length for name is 100']
  })
  public name!: string;

  @prop({
    trim: true,
    required: true,
    minlength: [20, 'Min length for description is 20'],
    maxlength: [1024, 'Min length for description is 1024']
  })
  public description!: string;

  @prop({required: true})
  public date!: Date;

  @prop({required: true, type: () => String, enum: City})
  public city!: City;

  @prop({required: true})
  public previewImg!: string;

  @prop({
    required: true,
    type: () => String,
    default: []
  })
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavourites!: boolean;

  @prop({required: true})
  public rating!: 1 | 1.1 | 1.2 | 1.3 | 1.4 | 1.5 | 1.6 | 1.7 | 1.8 | 1.9 |
    2 | 2.1 | 2.2 | 2.3 | 2.4 | 2.5 | 2.6 | 2.7 | 2.8 | 2.9 |
    3 | 3.1 | 3.2 | 3.3 | 3.4 | 3.5 | 3.6 | 3.7 | 3.8 | 3.9 |
    4 | 4.1 | 4.2 | 4.3 | 4.4 | 4.5 | 4.6 | 4.7 | 4.8 | 4.9 |
    5;

  @prop({required: true, type: () => String, enum: Housing})
  public housing!: Housing;

  @prop({required: true})
  public countRooms!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  @prop({required: true})
  public countPeople!: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  @prop({
    required: true,
    min: [100, 'Min length for price is 100'],
    max: [100000, 'Min length for price is 100000'],
  })
  public price!: number;

  @prop({
    ref: FacilitiesEntity,
    required: true,
    default: [],
    _id: false
  })
  public facilities!: Ref<FacilitiesEntity>[];

  @prop({required: true, ref: UserEntity})
  public author!: User;

  @prop({default: 0})
  public countComments!: number;

  @prop({required: true, type: () => String,})
  public coordinates!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
