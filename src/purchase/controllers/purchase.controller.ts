import { type Request, type Response } from 'express'
import PurchaseService from '../services/purchase.service'
import { HttpResponse } from '../../shared/response/http.response'

class PurchaseController {
  private readonly PurchaseService: PurchaseService
  private readonly httpResponse: HttpResponse

  constructor() {
    this.PurchaseService = new PurchaseService()
    this.httpResponse = new HttpResponse()
  }

  async createPurchase(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.PurchaseService.create(req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.BadRequest(res, error)
    }
  }

  async deletePurchase(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.PurchaseService.delete(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getPurchases(
    _req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.PurchaseService.getAll()

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getPurchaseById(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.PurchaseService.getById(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async updatePurchase(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.PurchaseService.update(id, req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }
}

export default PurchaseController
