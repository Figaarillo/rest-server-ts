import { CategoryService } from '../services/category.service'
import { type Request, type Response } from 'express'

export class CategoryController {
  private readonly categoryService: CategoryService

  constructor() {
    this.categoryService = new CategoryService()
  }

  async getCategories(_req: Request, res: Response): Promise<void> {
    try {
      const data = await this.categoryService.getAll()

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.body

    try {
      const data = await this.categoryService.getById(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.categoryService.create(req.body)

      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.categoryService.delete(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.categoryService.update(id, req.body)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}
