import axios from 'axios'
import * as cheerio from 'cheerio'
import Worker from '#models/worker'

export async function scrapeWorkersW1() {
  const facultyNumber = 1
  const url = 'https://wa.pwr.edu.pl/studenci/studia-i-stopnia-2/dziekanat'

  const phoneRegex = /tel\.\s*([+\d\s]+)/
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/

  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  const workers: Partial<Worker>[] = []

  for (const elem of $(
    '#module-description-content > div:nth-child(2) > div > table > tbody > tr:nth-child(n+2)'
  )) {
    const name = $(elem).find('td:nth-child(odd) > p strong').text().trim()
    const text = $(elem).find('td:nth-child(even)').text()

    const phoneMatch = text.match(phoneRegex)
    const phoneNumber = phoneMatch ? phoneMatch[1] : undefined

    const emailMatch = text.match(emailRegex)
    const email = emailMatch ? emailMatch[1].toLowerCase() : undefined
    workers.push({ name, phoneNumber, email, deansOfficeId: facultyNumber })
  }

  return workers
}
