import ConfigServer from '../../config/config'
import type UserEntity from '../../user/entities/user.entity'
import UserService from '../../user/services/user.service'
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import type PayloadToken from '../interfaces/auth.interface'

class AuthService extends ConfigServer {
  private readonly userService: UserService
  private readonly jwtInstance

  constructor() {
    super()
    this.userService = new UserService()
    this.jwtInstance = jwt
  }

  public async authenticate(
    username: string,
    password: string
  ): Promise<UserEntity | null> {
    const userByEmail = await this.userService.getByEmail(username)
    const userByUsername = await this.userService.getByEmail(username)

    if (userByUsername != null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ;(await bcrypt.compare(password, userByUsername.password)) &&
        userByUsername
    }

    if (userByEmail != null) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ;(await bcrypt.compare(password, userByEmail.password)) && userByEmail
    }

    return null
  }

  public signToken(payload: jwt.JwtPayload, secret: string): string {
    return this.jwtInstance.sign(payload, secret)
  }

  public async generateJWT(
    user: UserEntity
  ): Promise<{ accessToken: string; user: UserEntity } | null> {
    const userConsult = await this.userService.findUserWithRole(
      user.id,
      user.role
    )

    if (userConsult == null) return null

    const payload: PayloadToken = {
      role: userConsult.role,
      sub: userConsult.id,
    }

    const secret = this.getEnviroment('JWT_SECRET')

    if (secret == null) return null

    return {
      accessToken: this.signToken(payload, secret),
      user,
    }
  }
}

export default AuthService
