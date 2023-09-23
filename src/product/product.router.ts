import { type Request, type Response } from 'express'
import BaseRouter from '../shared/router/router'
import ProductController from './controllers/product.controller'
import ProductMiddleware from './middlewares/product.middleware'

class ProductRouter extends BaseRouter<ProductController, ProductMiddleware> {
  constructor() {
    super(ProductController, ProductMiddleware)
  }

  routes(): void {
    this.router.get('/products', (req: Request, res: Response) => {
      this.controller.getProducts(req, res)
    })

    this.router.get('/products/:id', (req: Request, res: Response) => {
      this.controller.getProductById(req, res)
    })

    this.router.post(
      '/products',
      (req, res, next) => {
        this.middleware.productValidator(req, res, next)
      },
      (req: Request, res: Response) => {
        this.controller.createProduct(req, res)
      }
    )

    this.router.put('/products/:id', (req: Request, res: Response) => {
      this.controller.updateProduct(req, res)
    })

    this.router.delete('/products/:id', (req: Request, res: Response) => {
      this.controller.deleteProduct(req, res)
    })
  }
}

export default ProductRouter
