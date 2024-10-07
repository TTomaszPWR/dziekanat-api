import axios from 'axios'
import * as cheerio from 'cheerio'
import Worker from '#models/worker'

export async function scrapeWorkersW7() {
  const facultyNumber = 7
  const url = 'https://wis.pwr.edu.pl/o-wydziale/struktura-organizacyjna/dziekanat-wydzialu'

  const response = await axios.get(url)
  const $ = cheerio.load(response.data)
  const workers: Partial<Worker>[] = []

  for (const elem of $(
    '#module-description-content > div:nth-child(2) > div > div > div > div > div > table > tbody > tr > td:nth-child(1)'
  )) {
    const name = $(elem).find('p:nth-child(1) > a').text()
    if (name) {
      const phoneNumber = $(elem)
        .find('p:nth-child(2)')
        .text()
        .replace(/[^\d\s]/g, '')
        .trim()
      const link = $(elem).find('p:nth-child(3) > a').attr('href')
      const email = await getEmailForWorker(link)
      workers.push({ name, phoneNumber, email, deansOfficeId: facultyNumber })
    }
  }

  return workers
}

async function getEmailForWorker(link: string | undefined) {
  if (link) {
    const response = await axios.get(link)
    const $ = cheerio.load(response.data)

    return $('#module-usercard-content > div:nth-child(2) > div > div > div:nth-child(1)')
      .text()
      .replace('Email: ', '')
  }
  return undefined
}
