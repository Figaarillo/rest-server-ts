import { type Request, type Response, type NextFunction } from 'express'
import UserDTO from '../dtos/user.dto'
import { validate } from 'class-validator'
import { HttpResponse } from '../../shared/response/http.response'

class UserMiddleware {
  private readonly httpResponse: HttpResponse

  constructor() {
    this.httpResponse = new HttpResponse()
  }

  userValidator(req: Request, res: Response, next: NextFunction): void {
    const { name, lastname, username, password, city, province, role } =
      req.body

    const userDTO = new UserDTO()

    userDTO.name = name
    userDTO.lastname = lastname
    userDTO.username = username
    userDTO.password = password
    userDTO.city = city
    userDTO.province = province
    userDTO.role = role

    validate(userDTO).then(errors => {
      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, errors)
      }
      next()
    })
  }
}

export default UserMiddleware
