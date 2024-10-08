import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { scrapeWorkingHours } from '../scripts/working_hours/working_hours.js'
import WorkingHour from '#models/working_hour'

export default class FetchHours extends BaseCommand {
  static commandName = 'fetch:hours'
  static description = ''

  static options: CommandOptions = {
    startApp: true
  }

  async run() {
    const hours = (await scrapeWorkingHours()).flat()
    console.log(hours);
    
    await WorkingHour.createMany(hours)
  }
}