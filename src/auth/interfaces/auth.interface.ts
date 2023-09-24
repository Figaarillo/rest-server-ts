import { type RoleType } from '../../user/dtos/user.dto'

interface PayloadToken {
  role: RoleType
  sub: string
}

export default PayloadToken
