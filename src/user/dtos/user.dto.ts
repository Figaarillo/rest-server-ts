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

  @IsNotEmpty()
  role!: RoleType
}

export enum RoleType {
  USER = 'USER',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}

export default UserDTO
