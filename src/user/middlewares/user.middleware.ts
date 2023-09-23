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

    const valid = new UserDTO()

    valid.name = name
    valid.lastname = lastname
    valid.username = username
    valid.password = password
    valid.city = city
    valid.province = province
    valid.role = role

    validate(valid).then(errors => {
      if (errors.length > 0) {
        return this.httpResponse.InternalServerError(res, errors)
      }
      next()
    })
  }
}

export default UserMiddleware
