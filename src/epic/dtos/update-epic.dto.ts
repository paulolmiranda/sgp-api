import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateEpicDto {
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString()
  @MaxLength(2000)
  description: string;
}
