import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { scrapeWorkersW10 } from '../scripts/w10.js'
import { scrapeWorkersW9 } from '../scripts/w9.js'

export default class ScriptTest extends BaseCommand {
  static commandName = 'script:test'
  static description = ''

  static options: CommandOptions = {
    startApp: true
  }

  async run() {
    /*const workers = await scrapeWorkersW14()
    console.log(workers)*/
    /*const working_hours = await scrapeWorkingHours()
    for (let i = 0; i < working_hours.length; i++) {
      console.log(parseOpeningHours(working_hours[i]))
    }*/

    await scrapeWorkersW9()

  }
}