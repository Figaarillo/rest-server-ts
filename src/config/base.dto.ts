/* eslint-disable indent */
import { IsDate, IsOptional, IsUUID } from 'class-validator'

export class BaseDTO {
  @IsUUID()
  @IsOptional()
  id!: string

  @IsDate()
  @IsOptional()
  cratedAt!: Date

  @IsDate()
  @IsOptional()
  updatedAt!: Date
}
