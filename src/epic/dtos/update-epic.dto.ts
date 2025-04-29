import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateEpicDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 2000)
  description: string;
}
