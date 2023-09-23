import { type UpdateResult, type DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import PurchaseProductEntity from '../entities/purchases-products.entity'
import type PurchaseProductDTO from '../dtos/purchase-product.dto'
import ProductService from '../../product/services/product.service'

class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  private readonly productService: ProductService
  constructor() {
    super(PurchaseProductEntity)
    this.productService = new ProductService()
  }

  async create(body: PurchaseProductDTO): Promise<PurchaseProductEntity> {
    const purchase = (await this.execRepository).create(body)

    const product = await this.productService.getById(purchase.product.id)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    purchase.totalPrice = product!.price * purchase.quantityProduct

    return await (await this.execRepository).save(purchase)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await (await this.execRepository).delete(id)
  }

  async getAll(): Promise<PurchaseProductEntity[]> {
    return await (await this.execRepository)
      .createQueryBuilder('purchase_product')
      .leftJoinAndSelect('purchase_product.product', 'product')
      .leftJoinAndSelect('purchase_product.purchase', 'purchase')
      .getMany()
  }

  async getById(id: string): Promise<PurchaseProductEntity | null> {
    return await (await this.execRepository)
      .createQueryBuilder('purchase_product')
      .leftJoinAndSelect('purchase_product.product', 'product')
      .leftJoinAndSelect('purchase_product.purchase', 'purchase')
      .where({ id })
      .getOne()
  }

  async update(
    id: string,
    infoUpdate: PurchaseProductDTO
  ): Promise<UpdateResult> {
    return await (await this.execRepository).update(id, infoUpdate)
  }
}

export default PurchaseProductService
