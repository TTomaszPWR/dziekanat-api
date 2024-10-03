import DeansOffice from '#models/deans_office'
import WorkingHour from '#models/working_hour'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { faker } from '@faker-js/faker'

export default class Dbtest extends BaseCommand {
  static commandName = 'dbtest'
  static description = ''

  static options: CommandOptions = {
    startApp: true
  }

  async run() {
    const deansOffice = await DeansOffice.query().select('id').orderByRaw('random()').firstOrFail()

    await WorkingHour.create({
      deansOfficeId: deansOffice.id,
      dayOfWeek: faker.helpers.arrayElement(['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']),
      openHour: faker.number.int({ min: 7, max: 11 }).toString() + ':00',
      closeHour: faker.number.int({ min: 13, max: 17 }).toString() + ':00',
    })
  }
}