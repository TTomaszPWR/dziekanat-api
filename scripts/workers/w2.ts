import axios from 'axios'
import * as cheerio from 'cheerio'
import Worker from '#models/worker'
import { capitalizeName } from '../../utils/string/capitalize_name.js'

export async function scrapeWorkersW2() {
  const facultyNumber = 2
  const url = 'https://wbliw.pwr.edu.pl/studenci/dziekanat'

  const phoneRegex = /tel\.\s*([+\d\s]+)/

  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  const workers: Partial<Worker>[] = []

  for (const elem of $(
    '#module-description-content > div:nth-child(3) > div > div.accordion > div > table > tbody > tr'
  )) {
    const title = $(elem).find('td:nth-child(odd)').contents().first().text().trim()
    const name = $(elem).find('td:nth-child(odd)').contents().eq(1).text().trim()

    const text = $(elem).find('td:nth-child(even)').text()

    const phoneMatch = text.match(phoneRegex)
    const phoneNumber = phoneMatch ? phoneMatch[1] : undefined

    let email = $(elem).find('td:nth-child(odd)').contents().eq(2).text().trim()
    if (!email) {
      email = $(elem).find('td:nth-child(odd)').contents().eq(3).text().trim()
    }
    email = email.replace('e-mail: ', '')

    workers.push({
      name: title + ' ' + capitalizeName(name),
      phoneNumber,
      email,
      deansOfficeId: facultyNumber,
    })
  }

  return workers
}
