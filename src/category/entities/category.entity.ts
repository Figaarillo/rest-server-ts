import { Column, Entity, OneToOne } from 'typeorm'
import BaseEntity from '../../config/base.entity'
import ProductEntity from '../../product/entities/product.entity'

@Entity({ name: 'category' })
class CategoryEntity extends BaseEntity {
  @Column()
  name!: string

  @OneToOne(() => ProductEntity, product => product.category)
  product!: ProductEntity
}

export default CategoryEntity
