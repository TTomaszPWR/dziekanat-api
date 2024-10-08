import axios from 'axios'
import * as cheerio from 'cheerio'
import Worker from '#models/worker'

export async function scrapeWorkersW6() {
  const facultyNumber = 6
  const url = 'https://wggg.pwr.edu.pl/studenci/dziekanat'

  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  const workers: Partial<Worker>[] = []

  // office leader
  const officeLeaderPath = $(
    '#module-description-content > div:nth-child(2) > div > div > div > div > div > table:nth-child(2) > tbody > tr > td'
  )
  const leaderName = officeLeaderPath.find('p:nth-child(1)').text().trim()
  const leaderEmail = officeLeaderPath.find('p:nth-child(2)').text().replace('e-mail:', '').trim()
  const leaderPhoneNumber = officeLeaderPath
    .find('p:nth-child(4)')
    .text()
    .replace(/[^\d\s]/g, '')
    .trim()
  workers.push({
    name: leaderName,
    phoneNumber: leaderPhoneNumber,
    email: leaderEmail,
    deansOfficeId: facultyNumber,
  })

  // office workers
  for (const elem of $(
    '#module-description-content > div:nth-child(2) > div > div > div > div > div > table:nth-child(4) > tbody > tr > td'
  )) {
    let name = $(elem).find('p:nth-child(1)').text()
    if (!name) {
      name = $(elem).find('p:nth-child(2)').text()
    }
    const phoneNumber =
      $(elem)
        .find('p:nth-last-child(1)')
        .text()
        .match(/tel. [\d\s]+/g)?.[0]
        .replace('tel.', '')
        .trim() || ''
    const email = $(elem).find('a').text().replace('e-mail:', '').trim()
    workers.push({ name, phoneNumber, email, deansOfficeId: facultyNumber })
  }

  return workers
}
