import { DeepPartial, EntityManager, ObjectLiteral, Repository } from 'typeorm';
import { IsolationLevel } from 'typeorm/driver/types/IsolationLevel';

export class BaseRepository<
  Entity extends ObjectLiteral,
> extends Repository<Entity> {
  public transaction<T>(
    runInTransaction: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
  public transaction<T>(
    isolationLevel: IsolationLevel,
    runInTransaction: (entityManager: EntityManager) => Promise<T>,
  ): Promise<T>;
  public transaction<T>(
    isolationOrRunInTransaction:
      | IsolationLevel
      | ((entityManager: EntityManager) => Promise<T>),
    runInTransactionParam?: (entityManager: EntityManager) => Promise<T>,
  ): Promise<any> {
    return this.manager.transaction(
      isolationOrRunInTransaction as any,
      runInTransactionParam as any,
    );
  }

  public saveTransaction<T extends DeepPartial<Entity>>(
    entities: T[],
    entityManager?: EntityManager,
  ): Promise<T[]>;
  public saveTransaction<T extends DeepPartial<Entity>>(
    entities: T[],
    entityManager?: EntityManager,
  ): Promise<(T & Entity)[]>;
  public saveTransaction<T extends DeepPartial<Entity>>(
    entity: T,
    entityManager?: EntityManager,
  ): Promise<T>;
  public saveTransaction<T extends DeepPartial<Entity>>(
    entity: T,
    entityManager?: EntityManager,
  ): Promise<T & Entity>;
  public saveTransaction<T extends DeepPartial<Entity>>(
    entityOrEntities: T | T[],
    entityManager?: EntityManager,
  ): Promise<T | T[]> {
    return (entityManager || this.manager).save(
      this.metadata.target as any,
      entityOrEntities as any,
    );
  }
}
