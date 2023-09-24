import { type Request, type Response } from 'express'
import PurchaseProductController from './controllers/purchase-product.controller'
import BaseRouter from '../shared/router/router'
import PurchaseProductsMiddleware from './middlewares/purchase-products.middleware'

class PurchaseProductRouter extends BaseRouter<
  PurchaseProductController,
  PurchaseProductsMiddleware
> {
  constructor() {
    super(PurchaseProductController, PurchaseProductsMiddleware)
  }

  routes(): void {
    this.router.get('/purchase-products', (req: Request, res: Response) => {
      this.controller.getPurchaseProducts(req, res)
    })

    this.router.get('/purchase-products/:id', (req: Request, res: Response) => {
      this.controller.getPurchaseProductById(req, res)
    })

    this.router.post(
      '/purchase-products',
      (req, res, next) => {
        this.middleware.purchaseProductsValidator(req, res, next)
      },
      (req: Request, res: Response) => {
        this.controller.createPurchaseProduct(req, res)
      }
    )

    this.router.put('/purchase-products/:id', (req: Request, res: Response) => {
      this.controller.updatePurchaseProduct(req, res)
    })

    this.router.delete(
      '/purchase-products/:id',
      (req: Request, res: Response) => {
        this.controller.deletePurchaseProduct(req, res)
      }
    )
  }
}

export default PurchaseProductRouter
