import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import {User, UserTypeEnum} from '../../types/index.js';
import {OfferEntity} from '../offer/index.js';
import {createSHA256} from '../../helpers/index.js';

const {prop, modelOptions} = typegoose;

export interface UserEntity extends defaultClasses.Base {
}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({type: () => String, unique: true, required: true})
  public email: string;

  @prop({type: () => String, required: false, default: '', match: [/.*\.(?:jpg|png)/, 'Avatar must be jpg or png']})
  public avatar?: string;

  @prop({
    type: () => String,
    required: true,
    minlength: [1, 'Min length for username is 1'],
    maxlength: [15, 'Max length for username is 15']
  })
  public name: string;

  @prop({
    type: () => String,
    required: true,
    enum: UserTypeEnum
  })
  public userType: UserTypeEnum;

  @prop({ required: true, ref: 'OfferEntity', default: [] })
  public isFavorite!: Ref<OfferEntity>[];

  @prop({
    type: () => String,
    required: true
  })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatar = userData.avatar;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
