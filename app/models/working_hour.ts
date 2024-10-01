import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DeanOffice from '#models/dean_office'
import { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class WorkingHour extends BaseModel {
  @column({ isPrimary: true })
  declare deansOfficeId: number

  @column()
  declare dayOfWeek: string

  @column()
  declare openHour: string

  @column()
  declare closeHour: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => DeanOffice)
  declare deanOffice: BelongsTo<typeof DeanOffice>
}
