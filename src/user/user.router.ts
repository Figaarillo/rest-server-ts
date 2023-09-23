import { type Request, type Response } from 'express'
import UserController from './controllers/user.controller'
import BaseRouter from '../shared/router/router'
import UserMiddleware from './middlewares/user.middleware'

class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware)
  }

  routes(): void {
    this.router.get('/users', (req: Request, res: Response) => {
      this.controller.getUsers(req, res)
    })

    this.router.get('/users/:id', (req: Request, res: Response) => {
      this.controller.getUserById(req, res)
    })

    this.router.post(
      '/users',
      (req, res, next) => {
        this.middleware.userValidator(req, res, next)
      },
      (req: Request, res: Response) => {
        this.controller.createUser(req, res)
      }
    )

    this.router.put('/users/:id', (req: Request, res: Response) => {
      this.controller.updateUser(req, res)
    })

    this.router.delete('/users/:id', (req: Request, res: Response) => {
      this.controller.deleteUser(req, res)
    })
  }
}

export default UserRouter
