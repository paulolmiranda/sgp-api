import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SwimlaneUpdateDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 1800)
  description: string;
}
