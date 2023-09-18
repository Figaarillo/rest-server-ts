import { IsNotEmpty } from 'class-validator'
import { BaseDTO } from '../../config/base.dto'

class UserDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  lastname!: string

  @IsNotEmpty()
  username!: string

  @IsNotEmpty()
  password!: string

  @IsNotEmpty()
  city!: string

  @IsNotEmpty()
  province!: string
}

export default UserDTO
