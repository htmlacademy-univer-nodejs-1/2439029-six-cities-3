import { User } from '../../types/index.js';

export class UserEntity implements User {
  avatar?: string;
  email: string;
  name: string;
  password: string;
  userType: "normal" | "pro";
}
