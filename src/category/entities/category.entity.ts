/* eslint-disable indent */
import { Column, Entity, OneToOne } from 'typeorm'
import BaseEntity from '../../config/base.entity'
import ProductEntity from '../../product/entities/product.entity'

@Entity({ name: 'customer' })
class CategoryEntity extends BaseEntity {
  @Column()
  name!: string

  @OneToOne(() => ProductEntity, product => product.category)
  product!: ProductEntity
}

export default CategoryEntity
