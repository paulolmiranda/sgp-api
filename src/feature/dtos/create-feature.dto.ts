import { IsNotEmpty, IsUUID, IsString, Length } from 'class-validator';
export class CreateFeatureDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 2000, { message: 'A descrição deve ter entre 10 e 2000 caracteres' })
  description: string;

  @IsUUID()
  @IsNotEmpty()
  projectId: string;

  @IsUUID()
  @IsNotEmpty()
  epicId: string;
}
