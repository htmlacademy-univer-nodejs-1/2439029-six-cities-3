import { Expose } from 'class-transformer';

export class UploadUserAvatarResponse {
  @Expose()
  public filepath!: string;
}
