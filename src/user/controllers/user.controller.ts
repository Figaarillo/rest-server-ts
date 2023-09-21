import { type Request, type Response } from 'express'
import UserService from '../services/user.service'
import { HttpResponse } from '../../shared/response/http.response'

class UserController {
  private readonly userService: UserService
  private readonly httpResponse: HttpResponse

  constructor() {
    this.userService = new UserService()
    this.httpResponse = new HttpResponse()
  }

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.userService.create(req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Ok(res, error)
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const data = await this.userService.delete(id)

      if (data.affected === 0) {
        return this.httpResponse.NotFound(res, 'Error updating user')
      }

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Ok(res, error)
    }
  }

  async getUsers(_req: Request, res: Response): Promise<Response | undefined> {
    try {
      const data = await this.userService.getAll()
      if (data.length === 0) {
        return this.httpResponse.NotFound(res, 'User not found')
      }

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Ok(res, error)
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const data = await this.userService.getById(id)
      if (data == null) {
        return this.httpResponse.NotFound(res, 'User not found')
      }

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Ok(res, error)
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    try {
      const data = await this.userService.update(id, req.body)

      if (data.affected === 0) {
        return this.httpResponse.NotFound(res, 'Error updating user')
      }

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.Ok(res, error)
    }
  }
}

export default UserController
