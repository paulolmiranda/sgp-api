import { Dto } from 'src/commons/dto';

export class ProjectCreatedDto extends Dto {
  public id: string;

  public title: string;

  public description: string;
}
