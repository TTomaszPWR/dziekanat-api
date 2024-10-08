import * as cheerio from 'cheerio'
import axios from 'axios'

export async function scrapeWorkersW14() {
  const url = 'https://wmed.pwr.edu.pl/o-wydziale/struktura-organizacyjna/dziekanat'
  const response = await axios.get(url)
  const html = response.data
  const $ = cheerio.load(html)
  const $text = $('div.text p')
  const listOfWorkers = []

  for (let i = 3; i <= 5; i++) {
    let text = $text.eq(i).html()
    if (text !== null) {
      text = text.split('</a>')[0].trim() + '<a/>'
      const arr = text.split('<br>')
      for (let j = 0; j < arr.length; j++) {
        let line = cheerio.load(arr[j])
        arr[j] = line.text()
      }

      const worker = {
        deansOfficeId: 14,
        name: arr[1],
        phoneNumber: arr[2]
          .split('.')[1]
          .replace(/[^\d\s]/g, '')
          .trim(),
        email: arr[3].split(':')[1].replace(/\s+/g, ''),
        info: arr[0],
      }
      listOfWorkers.push(worker)
    }
  }
  return listOfWorkers
}
