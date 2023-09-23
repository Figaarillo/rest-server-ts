import { type NextFunction, type Request, type Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import CustomerDTO from '../dtos/customer.dto'
import { validate } from 'class-validator'

class CustomerMiddleware {
  private readonly httpResponse: HttpResponse

  constructor() {
    this.httpResponse = new HttpResponse()
  }

  customerValidator(req: Request, res: Response, next: NextFunction): void {
    const { address, dni, user } = req.body

    const customerDTO = new CustomerDTO()

    customerDTO.address = address
    customerDTO.dni = dni
    customerDTO.user = user

    validate(customerDTO).then(errors => {
      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, errors)
      }

      next()
    })
  }
}

export default CustomerMiddleware
