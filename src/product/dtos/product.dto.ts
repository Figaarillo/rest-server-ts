import { IsNotEmpty } from 'class-validator'
import CategoryEntity from '../../category/entities/category.entity'
import { BaseDTO } from '../../config/base.dto'

class ProductDTO extends BaseDTO {
  @IsNotEmpty()
  productName!: string

  @IsNotEmpty()
  description!: string

  @IsNotEmpty()
  category!: CategoryEntity
}

export default ProductDTO
