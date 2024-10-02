import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import DeansOffice from '#models/deans_office'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class WorkingHour extends BaseModel {
  @column({ isPrimary: true })
  declare deansOfficeId: number

  @column({ isPrimary: true })
  declare dayOfWeek: string

  @column()
  declare openHour: string

  @column()
  declare closeHour: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => DeansOffice)
  declare deanOffice: BelongsTo<typeof DeansOffice>
}
