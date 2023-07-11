/* eslint-disable indent */
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date

  @UpdateDateColumn({
    name: 'updated_ad',
    type: 'timestamp',
  })
  updatedAt!: Date
}

export default BaseEntity
