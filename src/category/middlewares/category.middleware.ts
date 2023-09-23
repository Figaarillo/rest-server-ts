import { type NextFunction, type Request, type Response } from 'express'
import { HttpResponse } from '../../shared/response/http.response'
import CategoryDTO from '../dtos/category.dto'
import { validate } from 'class-validator'

class CategoryMiddleware {
  private readonly httpResponse: HttpResponse

  constructor() {
    this.httpResponse = new HttpResponse()
  }

  categoryValidator(req: Request, res: Response, next: NextFunction): void {
    const { name } = req.body

    const categoryDTO = new CategoryDTO()

    categoryDTO.name = name

    validate(name).then(errors => {
      if (errors.length > 0) {
        return this.httpResponse.BadRequest(res, errors)
      }

      next()
    })
  }
}

export default CategoryMiddleware
