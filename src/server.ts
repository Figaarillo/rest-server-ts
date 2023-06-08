import express, { Application, Router } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import UserRouter from './router/user.router'

class ServerBoostrap {
  public app: Application
  private readonly port: number

  constructor() {
    this.app = express()
    this.port = 8000

    // middlewares
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(morgan('dev'))
    this.app.use(cors())

    // routes
    this.app.use('/api', this.routes())
    
    // server
    this.listen()
  }

  public routes(): Array<Router> {
    return [new UserRouter().router]
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server is listening on http://localhost:${this.port}/`)
    }) }
}

// eslint-disable-next-line no-new
new ServerBoostrap()

export default ServerBoostrap
