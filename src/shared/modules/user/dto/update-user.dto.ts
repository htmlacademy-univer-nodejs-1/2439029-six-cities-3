import {IsOptional} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  public email?: string;

  @IsOptional()
  public name?: string;

  @IsOptional()
  public avatar?: string;
}
