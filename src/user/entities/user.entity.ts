/* eslint-disable indent */
import { Column, Entity, OneToOne } from 'typeorm'
import BaseEntity from '../../config/base.entity'
import CustomerEntity from '../../customer/entities/customer.entity'
import { RoleType } from '../dtos/user.dto'

@Entity({ name: 'users' })
class UserEntity extends BaseEntity {
  @Column()
  name!: string

  @Column()
  lastname!: string

  @Column()
  username!: string

  @Column({ select: false })
  password!: string

  @Column()
  city!: string

  @Column()
  province!: string

  @Column({ type: 'enum', enum: RoleType, nullable: false })
  role!: RoleType

  @OneToOne(() => CustomerEntity, customer => customer.user)
  customer!: CustomerEntity
}

export default UserEntity
