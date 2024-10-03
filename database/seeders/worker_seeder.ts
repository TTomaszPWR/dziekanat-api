import { WorkerFactory } from '#database/factories/worker_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
   await WorkerFactory.createMany(100)
  }
}