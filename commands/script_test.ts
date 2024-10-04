import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { scrapeWorkingHoursW14 } from '../scripts/w14.js'
import { parseOpeningHours } from '../scripts/parseOpeningHours.js'

export default class ScriptTest extends BaseCommand {
  static commandName = 'script:test'
  static description = ''

  static options: CommandOptions = {
    startApp: true
  }

  async run() {
    /*const workers = await scrapeWorkersW14()
    console.log(workers)*/
    const working_hours = await scrapeWorkingHoursW14()
    for (let i = 0; i < working_hours.length; i++) {
      console.log(parseOpeningHours(working_hours[i]))
    }

  }
}