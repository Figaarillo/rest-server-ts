import { type UpdateResult, type DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import CategoryEntity from '../entities/category.entity'
import { type CategoryDTO } from '../dtos/category.dto'

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity)
  }

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    return await (await this.execRepository).save(category)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await (await this.execRepository).delete({ id })
  }

  async getAll(): Promise<CategoryEntity[]> {
    return await (await this.execRepository).find()
  }

  async getById(id: string): Promise<CategoryEntity | null> {
    return await (await this.execRepository).findOneBy({ id })
  }

  async update(id: string, infoUpdate: CategoryDTO): Promise<UpdateResult> {
    return await (await this.execRepository).update(id, infoUpdate)
  }
}
