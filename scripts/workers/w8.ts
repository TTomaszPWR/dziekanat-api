import * as cheerio from 'cheerio'
import axios from 'axios'

export async function scrapeWorkersW8() {
  const url = 'https://wz.pwr.edu.pl/studenci/1dziekanat/studia-stacjonarne-i-stopnia'
  const listOfWorkers = []
  const deansOfficeId = 8

  const response = await axios.get(url)
  const html = response.data
  const $ = cheerio.load(html)
  let elements = $('td')
  for (let i = 0; i < elements.length; i++) {
    const element = elements.eq(i).html()!.replaceAll('<br>', '|')
    const text = cheerio.load(element).text()
    const texts = text.split('|')
    if (texts.length > 2) {
      const name = texts[0].split('pok.')[0].trim()
      const phoneNumber = texts[1].split('tel.')[1].replace(/\D+/g, '').trim()
      const email = texts[2]
      listOfWorkers.push({ name, phoneNumber, email, deansOfficeId: deansOfficeId })
    }
  }
  return listOfWorkers
}
