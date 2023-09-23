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

  async create(
    purchaseProduct: PurchaseProductDTO
  ): Promise<PurchaseProductEntity> {
    const newPurchaseProduct = (await this.execRepository).create(
      purchaseProduct
    )

    const product = await this.productService.getById(
      newPurchaseProduct.product.id
    )

    newPurchaseProduct.totalPrice =
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      product!.price * newPurchaseProduct.quantityProduct

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
