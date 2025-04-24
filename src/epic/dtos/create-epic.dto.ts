import { IsNotEmpty, IsUUID, IsString, MaxLength } from 'class-validator';

export class CreateEpicDto {
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString()
  @MaxLength(2000)
  description: string;

  @IsUUID()
  @IsNotEmpty({ message: 'O projectId é obrigatório' })
  projectId: string;
}
