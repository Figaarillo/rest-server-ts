import { type NextFunction, type Request, type Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import PurchaseProductsDTO from '../dtos/purchase-product.dto'
import { validate } from 'class-validator'

class PurchaseProductsMiddleware {
  private readonly httpResponse: HttpResponse

  constructor() {
    this.httpResponse = new HttpResponse()
  }

  purchaseProductsValidator(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    const { purchase, product, quantityProduct, totalPrice } = req.body

    const purchaseProductsDTO = new PurchaseProductsDTO()

    purchaseProductsDTO.purchase = purchase
    purchaseProductsDTO.product = product
    purchaseProductsDTO.quantityProduct = quantityProduct
    purchaseProductsDTO.totalPrice = totalPrice

    validate(purchaseProductsDTO).then(errors => {
      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, errors)
      }

      next()
    })
  }
}

export default PurchaseProductsMiddleware
