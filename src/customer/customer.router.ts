import { type Request, type Response } from 'express'
import BaseRouter from '../shared/router/router'
import CustomerController from './controllers/customer.controller'

class CustomerRouter extends BaseRouter<CustomerController> {
  constructor() {
    super(CustomerController)
  }

  routes(): void {
    this.router.get('/customers', (req: Request, res: Response) => {
      this.controller.getCustmoers(req, res)
    })

    this.router.get('/customers/:id', (req: Request, res: Response) => {
      this.controller.getCustomerById(req, res)
    })

    this.router.post('/customers', (req: Request, res: Response) => {
      this.controller.createCustomer(req, res)
    })

    this.router.put('/customers/:id', (req: Request, res: Response) => {
      this.controller.updateCustomer(req, res)
    })

    this.router.delete('/customers/:id', (req: Request, res: Response) => {
      this.controller.deleteCustomer(req, res)
    })
  }
}

export default CustomerRouter
