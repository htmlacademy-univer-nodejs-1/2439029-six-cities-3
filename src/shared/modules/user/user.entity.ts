import { User } from '../../types/index.js';
import {getModelForClass, prop} from '@typegoose/typegoose';

export class UserEntity implements User {
  @prop({ required: false, default: "avatar.jpg", match: [/\.(jpg|png)$/, 'Avatar image format jpg or png'],})
  avatar?: string;

  @prop({ unique: true, match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'], required: true,})
  email: string;

  @prop({required: true, minlength: [1, 'Min length for name is 1'], maxlength: [15, 'Max length for name is 15'],})
  name: string;

  @prop({required: true, minlength: [6, 'Min length for name is 6'], maxlength: [12, 'Max length for name is 12'],})
  password: string;

  @prop({required: true, enum: ['normal', 'pro'],})
  userType: "normal" | "pro";
}

export const UserModel = getModelForClass(UserEntity);
