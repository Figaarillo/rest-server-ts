/* eslint-disable indent */
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import BaseEntity from '../../config/base.entity'
import UserEntity from '../../user/entities/user.entity'
import PurchaseEntity from '../../purchase/entities/purchase.entity'

@Entity({ name: 'customer' })
class CustomerEntity extends BaseEntity {
  @Column()
  address!: string

  @Column()
  dni!: string

  @OneToOne(() => UserEntity, user => user.customer)
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity

  @OneToMany(() => PurchaseEntity, purchases => purchases.customer)
  purchases!: PurchaseEntity[]
}

export default CustomerEntity
