import { type Request, type Response } from 'express'
import ProductService from '../services/product.service'

class ProductController {
  private readonly productService: ProductService

  constructor() {
    this.productService = new ProductService()
  }

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.productService.create(req.body)

      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.productService.delete(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getProducts(_req: Request, res: Response): Promise<void> {
    try {
      const data = await this.productService.getAll()

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.productService.getById(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.productService.update(id, req.body)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}

export default ProductController
