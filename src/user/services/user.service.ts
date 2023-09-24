import { type UpdateResult, type DeleteResult } from 'typeorm'
import { BaseService } from '../../config/base.service'
import UserEntity from '../entities/user.entity'
import type UserDTO from '../dtos/user.dto'
import bcrypt from 'bcrypt'
import { type RoleType } from '../dtos/user.dto'

class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity)
  }

  async create(user: UserEntity): Promise<UserEntity> {
    const newUser = await (await this.execRepository).save(user)

    const hashedPassword = await bcrypt.hash(newUser.password, 10)

    newUser.password = hashedPassword

    return await (await this.execRepository).save(newUser)
  }

  async delete(id: string): Promise<DeleteResult> {
    return await (await this.execRepository).delete(id)
  }

  async getAll(): Promise<UserEntity[]> {
    return await (await this.execRepository).find()
  }

  async getById(id: string): Promise<UserEntity | null> {
    return await (await this.execRepository).findOneBy({ id })
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return await (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne()
  }

  async getByUsername(username: string): Promise<UserEntity | null> {
    return await (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne()
  }

  async update(id: string, infoUpdate: UserDTO): Promise<UpdateResult> {
    return await (await this.execRepository).update(id, infoUpdate)
  }

  async findUserWithRole(
    id: string,
    role: RoleType
  ): Promise<UserEntity | null> {
    const user = await (await this.execRepository)
      .createQueryBuilder('user')
      .where({ id })
      .andWhere({ role })
      .getOne()

    return user
  }
}

export default UserService
