import { type Request, type Response } from 'express'
import UserService from '../services/purchase-product.service'
import { HttpResponse } from '../../shared/response/http.response'

class PurchaseProductController {
  private readonly PurchaseProductService: UserService
  private readonly httpResponse: HttpResponse

  constructor() {
    this.PurchaseProductService = new UserService()
    this.httpResponse = new HttpResponse()
  }

  async createPurchaseProduct(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.PurchaseProductService.create(req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.BadRequest(res, error)
    }
  }

  async deletePurchaseProduct(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.PurchaseProductService.delete(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getPurchaseProducts(
    _req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.PurchaseProductService.getAll()

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getPurchaseProductById(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.PurchaseProductService.getById(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async updatePurchaseProduct(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.PurchaseProductService.update(id, req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }
}

export default PurchaseProductController
