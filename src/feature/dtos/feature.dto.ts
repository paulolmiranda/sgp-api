import { Feature } from '../feature.entity';
export class FeatureDto {
  id: string;
  description: string;

  static fromEntity(f: Feature): FeatureDto {
    const dto = new FeatureDto();
    dto.id          = f.id;
    dto.description = f.description;
    return dto;
  }
}
