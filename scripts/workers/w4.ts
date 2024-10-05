import axios from 'axios'
import * as cheerio from 'cheerio'
import Worker from '#models/worker'

export async function scrapeWorkersW4() {
  const facultyNumber = 4
  const url = 'https://wit.pwr.edu.pl/studenci/dziekanat/kontakt'

  const phoneRegex = /tel\.\s*([+\d\s]+)/
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/

  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  const workers: Partial<Worker>[] = []

  for (const elem of $(
    '#module-description-content > div:nth-child(2) > div > div > div > div > div > table > tbody > tr:nth-child(n+3)'
  )) {
    const name = $(elem).find('td:nth-child(odd) > p:first-child').text().trim()
    if (name) {
      const text = $(elem).find('td:nth-child(even)').text()

      const phoneMatch = text.match(phoneRegex)
      const phoneNumber = phoneMatch ? phoneMatch[1] : undefined

      const emailMatch = text.match(emailRegex)
      const email = emailMatch ? emailMatch[1] : undefined
      workers.push({ name, phoneNumber, email, deansOfficeId: facultyNumber })
    }
  }

  return workers
}
