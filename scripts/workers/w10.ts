import * as cheerio from 'cheerio'
import axios from 'axios'
import { capitalizeName } from '../../utils/string/capitalize_name.js'

export async function scrapeWorkersW10() {
  const url =
    'https://wm.pwr.edu.pl/pracownicy/administracja-wydzialu/zespol-ds-dydaktyki/studia-stacjonarne-2'
  const listOfWorkers = []
  const response = await axios.get(url)
  const html = response.data
  const $ = cheerio.load(html)
  const elements = $('tr')

  for (let i = 1; i < 5; i++) {
    const $element = cheerio.load(elements[i]).text()
    const element = $element.split('\n').filter(function (elem) {
      return elem !== ''
    })
    const contactInfo = element[2].split('tel.')[1]
    const contactInfos = contactInfo.split('e-mail:')

    const worker = {
      deansOfficeId: 10,
      name: capitalizeName(element[0]),
      phoneNumber: contactInfos[0].replace(/[^\d\s]/g, '').trim(),
      email: contactInfos[1].trim(),
      info: element[1].trim(),
    }
    listOfWorkers.push(worker)
  }

  return listOfWorkers
}
