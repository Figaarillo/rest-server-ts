import { HttpResponse } from '../../shared/response/http.response'
import { CategoryService } from '../services/category.service'
import { type Request, type Response } from 'express'

class CategoryController {
  private readonly categoryService: CategoryService
  private readonly httpResponse: HttpResponse

  constructor() {
    this.categoryService = new CategoryService()
    this.httpResponse = new HttpResponse()
  }

  async getCategories(
    _req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.categoryService.getAll()

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getCategoryById(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.body

    try {
      const data = await this.categoryService.getById(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async createCategory(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.categoryService.create(req.body)

      return this.httpResponse.Created(res, data)
    } catch (error) {
      return this.httpResponse.BadRequest(res, error)
    }
  }

  async deleteCategory(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.categoryService.delete(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async updateCategory(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.categoryService.update(id, req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }
}

export default CategoryController
