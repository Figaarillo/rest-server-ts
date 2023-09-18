import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from '../../config/base.dto'
import ProductEntity from '../../product/entities/product.entity'
import PurchaseEntity from '../entities/purchase.entity'

class PurchaseProduct extends BaseDTO {
  @IsNotEmpty()
  quantityProduct!: number

  @IsNotEmpty()
  totalPrice!: number

  @IsNotEmpty()
  product!: ProductEntity

  @IsNotEmpty()
  purchase!: PurchaseEntity
}

export default PurchaseProduct
