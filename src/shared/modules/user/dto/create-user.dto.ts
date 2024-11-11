export class CreateUserDto {
  name!: string;
  email!: string;
  avatar?: string;
  password!: string;
  userType!: string;
}
