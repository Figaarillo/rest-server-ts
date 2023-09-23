import { type DeleteResult, type UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import PurchaseEntity from '../entities/purchase.entity'
import type PurchaseDTO from '../dtos/purchase.dto'

class PurchaseService extends BaseService<PurchaseEntity> {
  constructor() {
    super(PurchaseEntity)
  }

  async create(Purchase: PurchaseEntity): Promise<PurchaseEntity> {
    return await (await this.execRepository).save(Purchase)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await (await this.execRepository).delete(id)
  }

  async getAll(): Promise<PurchaseEntity[]> {
    return await (await this.execRepository)
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.customer', 'customer')
      .getMany()
  }

  async getById(id: string): Promise<PurchaseEntity | null> {
    return await (await this.execRepository)
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('purchase.customer', 'customer')
      .where({ id })
      .getOne()
  }

  async update(id: string, infoUpdate: PurchaseDTO): Promise<UpdateResult> {
    return await (await this.execRepository).update(id, infoUpdate)
  }
}

export default PurchaseService
