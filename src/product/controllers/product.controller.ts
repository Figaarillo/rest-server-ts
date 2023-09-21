import { type Request, type Response } from 'express'
import ProductService from '../services/product.service'
import { HttpResponse } from '../../shared/response/http.response'

class ProductController {
  private readonly productService: ProductService
  private readonly httpResponse: HttpResponse

  constructor() {
    this.productService = new ProductService()
    this.httpResponse = new HttpResponse()
  }

  async createProduct(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.productService.create(req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async deleteProduct(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.productService.delete(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getProducts(
    _req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.productService.getAll()

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getProductById(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.productService.getById(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async updateProduct(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.productService.update(id, req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }
}

export default ProductController
