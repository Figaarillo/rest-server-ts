import { type UpdateResult, type DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import CustomerEntity from '../entities/customer.entity'
import type CustomerDto from '../dtos/customer.dto'

class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity)
  }

  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    return await (await this.execRepository).save(customer)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await (await this.execRepository).delete(id)
  }

  async getAll(): Promise<CustomerEntity[]> {
    return await (await this.execRepository)
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .getMany()
  }

  async getById(id: string): Promise<CustomerEntity | null> {
    return await (await this.execRepository)
      .createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where({ id })
      .getOne()
  }

  async update(id: string, infoUpdate: CustomerDto): Promise<UpdateResult> {
    return await (await this.execRepository).update(id, infoUpdate)
  }
}

export default CustomerService
