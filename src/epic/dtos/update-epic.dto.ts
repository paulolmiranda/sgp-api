import { IsNotEmpty, IsUUID, IsString, Length } from 'class-validator';

export class UpdateEpicDto {
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString()
  @Length(10, 2000, {
    message: 'A descrição deve ter entre 10 e 2000 caracteres',
  })
  description: string;

  @IsUUID()
  @IsNotEmpty({ message: 'O projectId é obrigatório' })
  projectId: string;
}
