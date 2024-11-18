import { User } from '../../types/index.js';
import {defaultClasses, getModelForClass, prop, modelOptions} from '@typegoose/typegoose';
import {createSHA256} from "../../helpers/index.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps {
  @prop({ required: false, default: "avatar.jpg", match: [/\.(jpg|png|jpeg)$/, 'Avatar image format jpg or png'],})
  public avatar?: string;

  @prop({ unique: true, match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'], required: true,
    default: '' })
  public email: string;

  @prop({required: true, minlength: [1, 'Min length for name is 1'], maxlength: [15, 'Max length for name is 15'],
    default: '' })
  public name: string;

  @prop({required: true, minlength: [6, 'Min length for name is 6'], maxlength: [1024, 'Max length for name is 1024'],
    default: '' })
  private password?: string;

  @prop({required: true, enum: ['normal', 'pro'],})
  public userType: string; // "normal" | "pro";

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
}

export const UserModel = getModelForClass(UserEntity);
