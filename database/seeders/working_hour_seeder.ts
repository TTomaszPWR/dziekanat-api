import { WorkingHourFactory } from '#database/factories/working_hour_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    WorkingHourFactory.createMany(1)
  }
}