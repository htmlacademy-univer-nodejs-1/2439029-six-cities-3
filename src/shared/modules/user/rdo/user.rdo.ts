import {Expose} from 'class-transformer';
import {UserTypeEnum} from "../../../types/index.js";

export class UserRdo {
  @Expose()
  public id!: string;

  @Expose()
  public name!: string;

  @Expose()
  public email!: string;

  @Expose()
  public avatar!: string;

  @Expose()
  public userType!:UserTypeEnum;
}
