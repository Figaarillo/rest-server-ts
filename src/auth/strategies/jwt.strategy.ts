import type PayloadToken from '../interfaces/auth.interface'
import AuthService from '../services/auth.service'
import { PassportUse } from '../utils/passport.use'
import {
  ExtractJwt,
  Strategy as JWTStr,
  type StrategyOptions,
} from 'passport-jwt'

class JWTStrategy extends AuthService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super()
  }

  async validate(payload: PayloadToken, done: any): Promise<any> {
    return done(null, payload)
  }

  use(): void {
    PassportUse<
      JWTStr,
      StrategyOptions,
      (payload: PayloadToken, donde: any) => Promise<PayloadToken>
    >(
      'jwt',
      JWTStr,
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: this.getEnviroment('JWT_SECRET'),
      },
      this.validate
    )
  }
}

export default JWTStrategy
