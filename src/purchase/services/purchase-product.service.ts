import { type UpdateResult, type DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import PurchaseProductEntity from '../entities/purchases-products.entity'
import type PurchaseProductDTO from '../dtos/purchase-product.dto'

class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor() {
    super(PurchaseProductEntity)
  }

  async create(
    purchaseProduct: PurchaseProductEntity
  ): Promise<PurchaseProductEntity> {
    return await (await this.execRepository).save(purchaseProduct)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await (await this.execRepository).delete(id)
  }

  async getAll(): Promise<PurchaseProductEntity[]> {
    return await (await this.execRepository).find()
  }

  async getById(id: string): Promise<PurchaseProductEntity | null> {
    return await (await this.execRepository).findOneBy({ id })
  }

  async update(
    id: string,
    infoUpdate: PurchaseProductDTO
  ): Promise<UpdateResult> {
    return await (await this.execRepository).update(id, infoUpdate)
  }
}

export default PurchaseProductService
