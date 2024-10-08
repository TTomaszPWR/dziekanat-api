import * as cheerio from 'cheerio'
import axios from 'axios'

export async function scrapeWorkersW9() {
  const url = 'https://wme.pwr.edu.pl/o-wydziale/struktura-organizacyjna/administracja-dziekanatu'
  const listOfWorkers = []

  const response = await axios.get(url)
  const html = response.data
  const $ = cheerio.load(html)
  const elements = $('tr')
  for (let i = 2; i < elements.length; i++) {
    const $elements = elements.eq(i).children()
    const info = $elements.eq(0).text()

    let $children = $elements.eq(1).html()
    if ($children === null || $children.length === 0) continue
    $children = $children.replaceAll('<br>', '|')
    const children = cheerio
      .load($children)
      .text()
      .split('\n')
      .filter(function (element) {
        return element !== ''
      })

    for (const child of children) {
      const elems = child.split('|')
      if (elems.length > 2) {
        const worker = {
          deansOfficeId: 9,
          name: elems[0],
          phoneNumber: elems[elems.length - 2].split('tel.')[1].replace(/\D+/g, '').trim(),
          email: elems[elems.length - 1].split('mail:')[1].trim(),
          info: info,
        }
        listOfWorkers.push(worker)
      } else {
      }
    }
  }
  return listOfWorkers
}
