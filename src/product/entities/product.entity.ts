/* eslint-disable indent */
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import CategoryEntity from '../../category/entities/category.entity'
import BaseEntity from '../../config/base.entity'
import PurchaseProductEntity from '../../purchase/entities/purchases-products.entity'

@Entity({ name: 'product' })
class ProductEntity extends BaseEntity {
  @Column()
  productName!: string

  @Column()
  description!: string

  @Column()
  price!: number

  @OneToOne(() => CategoryEntity, category => category.product)
  @JoinColumn({ name: 'category_id' })
  category!: CategoryEntity

  @OneToMany(
    () => PurchaseProductEntity,
    purchaseProduct => purchaseProduct.product
  )
  purchaseProduct!: PurchaseProductEntity[]
}

export default ProductEntity
