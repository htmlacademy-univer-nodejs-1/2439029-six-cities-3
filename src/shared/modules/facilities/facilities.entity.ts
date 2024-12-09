import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { Facility } from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface FacilitiesEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'facilities'
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class FacilitiesEntity extends defaultClasses.TimeStamps implements Facility {
  @prop({required: true, trim: true})
  public name!: string;
}

export const FacilitiesModel = getModelForClass(FacilitiesEntity);
