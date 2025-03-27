export class Dto {
  public static newInstance<T extends Dto>(
    this: { new (): T } & typeof Dto,
    data: Partial<T>,
  ): T {
    const instance = Object.assign(new this(), data as T);

    Object.keys(instance)
      .filter((key) => Reflect.get(instance, key) === null)
      .forEach((key) => Reflect.set(instance, key, undefined));

    return instance;
  }
}
