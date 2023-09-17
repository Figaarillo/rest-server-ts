/* eslint-disable no-console */
/* eslint-disable n/no-path-concat */
import * as dotenv from 'dotenv'
import { type DataSource } from 'typeorm'
import { AppDataSource } from './data-source'

abstract class ConfigServer {
  constructor() {
    const nodeNameEnv = this.createPathEnv(this.getNodeEnv())
    dotenv.config({
      path: nodeNameEnv,
    })
  }

  public getEnviroment(key: string): string | undefined {
    return process.env[key.toUpperCase()]
  }

  public getNumberEnviroment(key: string): number {
    return Number(this.getEnviroment(key))
  }

  public getNodeEnv(): string {
    return this.getEnviroment('NODE_ENV')?.trim() ?? ''
  }

  public createPathEnv(path: string): string {
    const ENV: string = '.env'

    if (path.length > 0) {
      return `${ENV}.${path}`
    }

    return ENV
  }

  get initDBConnection(): Promise<DataSource> {
    return AppDataSource.initialize()
  }
}

export default ConfigServer
