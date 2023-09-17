import { type Request, type Response } from 'express'
import UserService from '../services/user.service'

class UserController {
  private readonly userService: UserService

  constructor() {
    this.userService = new UserService()
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.userService.create(req.body)

      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.userService.delete(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const data = await this.userService.getAll()

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.userService.getById(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.userService.update(id, req.body)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}

export default UserController
