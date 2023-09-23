import { type NextFunction, type Request, type Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import ProductDTO from '../dtos/product.dto'
import { validate } from 'class-validator'

class ProductMiddleware {
  private readonly httpResponse: HttpResponse

  constructor() {
    this.httpResponse = new HttpResponse()
  }

  productValidator(req: Request, res: Response, next: NextFunction): void {
    const { productName, description, price, category } = req.body

    const productDTO = new ProductDTO()

    productDTO.productName = productName
    productDTO.description = description
    productDTO.price = price
    productDTO.category = category

    validate(productDTO).then(errors => {
      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, errors)
      }

      next()
    })
  }
}

export default ProductMiddleware
