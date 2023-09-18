import { type Request, type Response } from 'express'
import PurchaseService from '../services/purchase.service'

class PurchaseController {
  private readonly PurchaseService: PurchaseService

  constructor() {
    this.PurchaseService = new PurchaseService()
  }

  async createPurchase(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.PurchaseService.create(req.body)

      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deletePurchase(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.PurchaseService.delete(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getPurchases(_req: Request, res: Response): Promise<void> {
    try {
      const data = await this.PurchaseService.getAll()

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getPurchaseById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.PurchaseService.getById(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async updatePurchase(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.PurchaseService.update(id, req.body)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}

export default PurchaseController
