import { DeansOfficeFactory } from '#database/factories/deans_office_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await DeansOfficeFactory.createMany(10)
  }
}