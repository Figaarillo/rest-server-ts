import { IsNotEmpty } from 'class-validator'
import UserEntity from '../../user/entities/user.entity'
import { BaseDTO } from '../../config/base.dto'

class CustomerDto extends BaseDTO {
  @IsNotEmpty()
  address!: string

  @IsNotEmpty()
  dni!: string

  @IsNotEmpty()
  user!: UserEntity
}

export default CustomerDto
