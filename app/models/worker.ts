import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DeansOffice from '#models/deans_office'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Worker extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare deansOfficeId: number

  @column()
  declare name: string

  @column()
  declare phoneNumber: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => DeansOffice)
  declare deanOffice: BelongsTo<typeof DeansOffice>
}
