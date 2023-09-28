import SharedMiddleware from '../shared/middlewares/shared.middleware'
import BaseRouter from '../shared/router/router'
import AuthController from './controller/auth.controller'

class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController, SharedMiddleware)
  }

  async routes(): Promise<void> {
    this.router.post(
      '/login',
      this.middleware.passAuth('login'),
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      async (req, res) => await this.controller.login(req, res)
    )
  }
}

export default AuthRouter
