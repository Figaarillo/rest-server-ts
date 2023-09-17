import { type ObjectLiteral, type EntityTarget, type Repository } from 'typeorm'
import type BaseEntity from './base.entity'
import ConfigServer from './config'

export class BaseService<TEntity extends BaseEntity> extends ConfigServer {
  public execRepository: Promise<Repository<TEntity>>

  constructor(getEntity: EntityTarget<TEntity>) {
    super()
    this.execRepository = this.initRepository(getEntity)
  }

  async initRepository<TEntity extends ObjectLiteral>(
    entity: EntityTarget<TEntity>
  ): Promise<Repository<TEntity>> {
    const getConnect = await this.initDBConnection
    return getConnect.getRepository(entity)
  }
}
