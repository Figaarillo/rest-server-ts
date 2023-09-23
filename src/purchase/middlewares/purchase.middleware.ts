import { type NextFunction, type Request, type Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import PurchaseDTO from '../dtos/purchase.dto'
import { validate } from 'class-validator'

class PurchaseMiddleware {
  private readonly httpResponse: HttpResponse

  constructor() {
    this.httpResponse = new HttpResponse()
  }

  purchaseValidator(req: Request, res: Response, next: NextFunction): void {
    const { customer, status, paymentMethod } = req.body

    const purchaseDTO = new PurchaseDTO()

    purchaseDTO.customer = customer
    purchaseDTO.status = status
    purchaseDTO.paymentMethod = paymentMethod

    validate(purchaseDTO).then(errors => {
      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, errors)
      }

      next()
    })
  }
}

export default PurchaseMiddleware
