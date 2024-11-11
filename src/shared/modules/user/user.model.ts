  import {Schema, Document, model} from 'mongoose';
  import { User } from '../../types/index.js';
  export interface UserDocument extends User, Document {
    createdAt: Date,
    updatedAt: Date,
  }

  const userSchema = new Schema({
    name:  {
      type: String,
      required: true,
      minlength: [1, 'Min length for name is 1'],
      maxlength: [15, 'Max length for name is 15'],
    },
    email: {
      type: String,
      unique: true,
      match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
      required: true,
    },
    avatar: {
      type: String,
      required: false,
      default: "avatar.jpg",
      match: [/\.(jpg|png)$/, 'Avatar image format jpg or png'],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Min length for name is 6'],
      maxlength: [12, 'Max length for name is 12'],
    },
    userType: {
      type: String,
      required: true,
      enum: ['normal', 'pro'],
    },
  }, { timestamps: true });

  export const UserModel = model<UserDocument>('User', userSchema);
