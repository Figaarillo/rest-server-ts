import { type Request, type Response } from 'express'
import UserService from '../services/purchase-product.service'

class PurchaseProductController {
  private readonly PurchaseProductService: UserService

  constructor() {
    this.PurchaseProductService = new UserService()
  }

  async createPurchaseProduct(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.PurchaseProductService.create(req.body)

      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deletePurchaseProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.PurchaseProductService.delete(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getPurchaseProducts(_req: Request, res: Response): Promise<void> {
    try {
      const data = await this.PurchaseProductService.getAll()

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getPurchaseProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.PurchaseProductService.getById(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async updatePurchaseProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.PurchaseProductService.update(id, req.body)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}

export default PurchaseProductController
