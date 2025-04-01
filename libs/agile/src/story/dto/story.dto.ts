import { Dto } from '@app/commons';

export class StoryDto extends Dto {
  public id: string;

  public title: string;

  public description: string;

  public startAt: string;

  public endAt: string;
}
