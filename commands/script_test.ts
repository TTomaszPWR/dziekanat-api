import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { scrapeWorkersW14, scrapeWorkingHoursW14 } from '../scripts/w14.js'

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
    console.log(working_hours)
  }
}