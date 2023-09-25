import type UserEntity from '../../user/entities/user.entity'
import AuthService from '../services/auth.service'
import { PassportUse } from '../utils/passport.use'
import { Strategy as LocalStrategy, type VerifyFunction } from 'passport-local'

const authService: AuthService = new AuthService()

class LoginStrattegy {
  async validate(
    username: string,
    password: string,
    done: any
  ): Promise<UserEntity> {
    const user = await authService.authenticate(username, password)
    if (user == null) {
      return done(null, false, { message: 'Username or password is incorrect' })
    }
    return done(null, user)
  }

  use(): void {
    // eslint-disable-next-line @typescript-eslint/ban-types
    PassportUse<LocalStrategy, Object, VerifyFunction>(
      'local',
      LocalStrategy,
      { usernameField: 'username', passwordField: 'password' },
      this.validate
    )
  }
}

export default LoginStrattegy
