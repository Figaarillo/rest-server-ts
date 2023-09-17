import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from '../../config/base.dto'

class CategoryDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string
}

export default CategoryDTO
