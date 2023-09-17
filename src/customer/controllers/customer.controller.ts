import { type Request, type Response } from 'express'
import CustomerService from '../services/customer.service'

class CustomerController {
  private readonly customerService: CustomerService

  constructor() {
    this.customerService = new CustomerService()
  }

  async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.customerService.create(req.body)

      res.status(201).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async deleteCustomer(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.customerService.delete(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getCustmoers(_req: Request, res: Response): Promise<void> {
    try {
      const data = await this.customerService.getAll()

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async getCustomerById(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.customerService.getById(id)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }

  async updateCustomer(req: Request, res: Response): Promise<void> {
    const { id } = req.params

    try {
      const data = await this.customerService.update(id, req.body)

      res.status(200).json(data)
    } catch (error) {
      console.error(error)
    }
  }
}

export default CustomerController
