export class BaseEntity {
  public static newInstance<T extends BaseEntity>(
    this: { new (): T } & typeof BaseEntity,
    entity: Partial<T>,
  ): T {
    return Object.assign(new this(), entity as T);
  }
}
