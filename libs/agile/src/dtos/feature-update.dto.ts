import { IsString, MaxLength, IsOptional } from 'class-validator';
import { Dto } from '@app/commons';

export class UpdateFeatureDto extends Dto {
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  readonly description?: string;
}
