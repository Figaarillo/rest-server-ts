import { IsNotEmpty } from 'class-validator'
import ProductEntity from '../../product/entities/product.entity'

export class CategoryDTO {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  product!: ProductEntity
}
