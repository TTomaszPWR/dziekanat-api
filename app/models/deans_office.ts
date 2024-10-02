import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Worker from '#models/worker'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import WorkingHour from '#models/working_hour'

export default class DeansOffice extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column()
  declare location: string

  @column()
  declare link: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Worker)
  declare workers: HasMany<typeof Worker>

  @hasMany(() => WorkingHour)
  declare workingHours: HasMany<typeof WorkingHour>
}
