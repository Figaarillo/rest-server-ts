import { Router } from 'express'

class BaseRouter<TController, TMiddleware> {
  public router: Router
  public controller: TController
  public middleware: TMiddleware

  constructor(
    Controller: new () => TController,
    Middleware: new () => TMiddleware
  ) {
    this.router = Router()
    this.controller = new Controller()
    this.middleware = new Middleware()
    this.routes()
  }

  routes(): void {}
}

export default BaseRouter
