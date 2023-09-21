import { type Request, type Response } from 'express'
import CustomerService from '../services/customer.service'
import { HttpResponse } from '../../shared/response/http.response'

class CustomerController {
  private readonly customerService: CustomerService
  private readonly httpResponse: HttpResponse

  constructor() {
    this.customerService = new CustomerService()
    this.httpResponse = new HttpResponse()
  }

  async createCustomer(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.customerService.create(req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.BadRequest(res, error)
    }
  }

  async deleteCustomer(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.customerService.delete(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getCustmoers(
    _req: Request,
    res: Response
  ): Promise<Response | undefined> {
    try {
      const data = await this.customerService.getAll()

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async getCustomerById(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.customerService.getById(id)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }

  async updateCustomer(
    req: Request,
    res: Response
  ): Promise<Response | undefined> {
    const { id } = req.params

    try {
      const data = await this.customerService.update(id, req.body)

      return this.httpResponse.Ok(res, data)
    } catch (error) {
      return this.httpResponse.NotFound(res, error)
    }
  }
}

export default CustomerController
