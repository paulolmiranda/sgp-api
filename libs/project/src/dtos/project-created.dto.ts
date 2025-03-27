import { Dto } from '@app/commons';

export class ProjectCreatedDto extends Dto {
  public id: string;

  public title: string;

  public description: string;
}
