import * as cheerio from 'cheerio'
import axios from 'axios'

export async function scrapeWorkersW13() {
  const url = 'https://wmat.pwr.edu.pl/studenci/dziekanat'
  const listOfWorkers = []

  const response = await axios.get(url)
  const html = response.data
  const $ = cheerio.load(html)
  let elements = $('tr')
  let info
  const firstIndex = 2
  for (let i = firstIndex; i <= elements.length - 1; i++) {
    try {
      let element = elements.eq(i).html()
      const children = elements.eq(i).children()
      if (children.length === 1) {
        const $info = cheerio.load(element!)
        info = $info.text().split('\n')[0].trim()
        continue
      }
      element = element!.replaceAll('<br>', '|')

      const $element = cheerio.load(element)
      const text = $element.text()
      const workerInfo = text.split('\n').filter(function (element) {
        return element !== ''
      })
      const workerRestInfo = workerInfo[1].split('|')
      let worker = null
      if (workerRestInfo.length === 3) {
        worker = {
          deansOfficeId: 13,
          name: workerInfo[0],
          phoneNumber: workerRestInfo[1].split('.')[1].replace(/\s+/g, ''),
          email: workerRestInfo[2].split(':')[1].replace(/\s+/g, ''),
          info: info,
        }
      } else {
        worker = {
          deansOfficeId: 13,
          name: workerInfo[0],
          email: workerRestInfo[1].split(':')[1].replace(/\s+/g, ''),
          info: info,
        }
      }
      listOfWorkers.push(worker)
    } catch {
      console.error('error')
    }
  }

  return listOfWorkers
}
