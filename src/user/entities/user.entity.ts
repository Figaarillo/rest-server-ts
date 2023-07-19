/* eslint-disable indent */
import { Column, Entity, OneToOne } from 'typeorm'
import BaseEntity from '../../config/base.entity'
import CustomerEntity from '../../customer/entities/customer.entity'

@Entity({ name: 'user' })
class UserEntity extends BaseEntity {
  @Column()
  name!: string

  @Column()
  lastname!: string

  @Column()
  username!: string

  @Column()
  password!: string

  @Column()
  city!: string

  @Column()
  province!: string

  @OneToOne(() => CustomerEntity, customer => customer.user)
  customer!: CustomerEntity
}

export default UserEntity
