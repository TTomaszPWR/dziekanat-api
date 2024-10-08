import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { scrapeWorkersW10 } from '../scripts/workers/w10.js'
import { scrapeWorkersW1 } from '../scripts/workers/w1.js'
import { scrapeWorkersW2 } from '../scripts/workers/w2.js'
import { scrapeWorkersW3 } from '../scripts/workers/w3.js'
import { scrapeWorkersW4 } from '../scripts/workers/w4.js'
import { scrapeWorkersW9 } from '../scripts/workers/w9.js'
import { scrapeWorkersW8 } from '../scripts/workers/w8.js'
import { scrapeWorkersW7 } from '../scripts/workers/w7.js'
import { scrapeWorkersW6 } from '../scripts/workers/w6.js'
import { scrapeWorkersW11 } from '../scripts/workers/w11.js'
import { scrapeWorkersW12 } from '../scripts/workers/w12.js'
import { scrapeWorkersW13 } from '../scripts/workers/w13.js'
import { scrapeWorkersW14 } from '../scripts/workers/w14.js'
import Worker from '#models/worker'

export default class ScriptTest extends BaseCommand {
  static commandName = 'fetch:workers'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const workerScrapers = [
      scrapeWorkersW1,
      scrapeWorkersW2,
      scrapeWorkersW3,
      scrapeWorkersW4,
      scrapeWorkersW6,
      scrapeWorkersW7,
      scrapeWorkersW8,
      scrapeWorkersW9,
      scrapeWorkersW10,
      scrapeWorkersW11,
      scrapeWorkersW12,
      scrapeWorkersW13,
      scrapeWorkersW14,
    ]

    for (const scraper of workerScrapers) {
      const workers = await scraper()
      await Worker.createMany(workers)
    }
  }
}
