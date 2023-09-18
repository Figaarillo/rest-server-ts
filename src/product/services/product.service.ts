import { type DeleteResult, type UpdateResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import ProductEntity from '../entities/product.entity'
import type ProductDTO from '../dtos/product.dto'

class ProductService extends BaseService<ProductEntity> {
  constructor() {
    super(ProductEntity)
  }

  async create(Product: ProductEntity): Promise<ProductEntity> {
    return await (await this.execRepository).save(Product)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await (await this.execRepository).delete(id)
  }

  async getAll(): Promise<ProductEntity[]> {
    return await (await this.execRepository).find()
  }

  async getById(id: string): Promise<ProductEntity | null> {
    return await (await this.execRepository).findOneBy({ id })
  }

  async update(id: string, infoUpdate: ProductDTO): Promise<UpdateResult> {
    return await (await this.execRepository).update(id, infoUpdate)
  }
}

export default ProductService
