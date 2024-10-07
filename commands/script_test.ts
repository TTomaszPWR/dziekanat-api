import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class ScriptTest extends BaseCommand {
  static commandName = 'fetch:data'
  static description = ''

  static options: CommandOptions = {
    startApp: true
  }

  async run() {

  }
}