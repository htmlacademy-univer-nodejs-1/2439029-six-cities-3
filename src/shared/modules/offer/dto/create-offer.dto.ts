import {Coordinates, Facility} from '../../../types/index.js';
import {Housing} from '../../../types/index.js';
import {City} from '../../../types/index.js';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsObject,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

export class CreateOfferDto {
  @MinLength(10, {message: 'Min length for name is 10'})
  @MaxLength(100, {message: 'Max length for name is 100'})
  public name!: string;

  @MinLength(20, {message: 'Min length for description is 20'})
  @MaxLength(1024, {message: 'Max length for description is 1024'})
  public description!: string;

  @IsEnum(City, {message: 'type must be one of the city'})
  public city!: City;

  @IsBoolean({message: 'isPremium premium must be boolean'})
  public isPremium!: boolean;

  @IsEnum(Housing, {message: 'type must be one of the housing types'})
  public housing!: Housing;

  @Min(1, {message: 'Min count of rooms is 1'})
  @Max(8, {message: 'Max count of rooms is 8'})
  public countRooms!: number;

  @Min(1, {message: 'Min count of people is 1'})
  @Max(10, {message: 'Max count of people is 10'})
  public countPeople!: number;

  @Min(500, {message: 'Min price is 500'})
  @Max(2000, {message: 'Max price is 2000'})
  public price!: number;

  @IsArray({message: 'field facilities must be an array'})
  @IsEnum(Facility, {each: true, message: 'type must be one of the facilities'})
  @ArrayNotEmpty({message: 'There should be at least 1 facility'})
  public facilities: Facility[];


  public userId!: string;

  @IsObject({message: 'There should be object CoordinatesType'})
  coordinates!: Coordinates;
}
