import axios from 'axios'
import * as cheerio from 'cheerio'
import Worker from '#models/worker'
import { capitalizeName } from '../../utils/string/capitalize_name.js'

export async function scrapeWorkersW3() {
  const facultyNumber = 3
  const url = 'https://wch.pwr.edu.pl/studenci/dziekanat'

  const phoneRegex = /tel\.\s*([+\d\s]+)/
  const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/

  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  const workers: Partial<Worker>[] = []

  // office leader
  const leaderInfo = $(
    '#module-description-content > div:nth-child(2) > div > div > div > div > div > p:nth-child(5)'
  )
    .html()
    ?.split('<br>')
  const leaderName = leaderInfo ? leaderInfo[1] : ''
  const leaderEmail = leaderInfo && leaderInfo[2] ? leaderInfo[2].match(emailRegex) : undefined
  const cleanedLeaderEmail = leaderEmail ? leaderEmail[0] : undefined
  const leaderPhoneNumber =
    leaderInfo && leaderInfo[3] ? leaderInfo[3].match(phoneRegex) : undefined
  const cleanedLeaderPhoneNumber = leaderPhoneNumber ? leaderPhoneNumber[1] : undefined

  workers.push({
    name: leaderName,
    phoneNumber: cleanedLeaderPhoneNumber,
    email: cleanedLeaderEmail,
    deansOfficeId: facultyNumber,
  })

  for (const elem of $(
    '#module-description-content > div:nth-child(2) > div > div > div > div > div > ul:nth-child(7) > li'
  )) {
    const name = $(elem).contents().first().text().trim()
    const cleanedName = name.replace(/\s*\(.*?\)\s*/g, ' ').trim()

    const phoneMatch = $(elem).html()?.match(phoneRegex)
    const phoneNumber = phoneMatch ? phoneMatch[1].trim() : undefined // Get the first capturing group

    const email = $(elem).find('a').text().trim() // Get the text of the anchor tag
    workers.push({
      name: capitalizeName(cleanedName),
      phoneNumber,
      email,
      deansOfficeId: facultyNumber,
    })
  }

  return workers
}
