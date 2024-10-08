import puppeteer from 'puppeteer'
import { parse_opening_hours } from '../../utils/parsers/parse_opening_hours.js'

export async function scrapeWorkingHours() {
  const url = 'https://przewodnik.pwr.edu.pl/pl/dziekanaty'

  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'networkidle0' })

  await page.waitForSelector('.c-card__opening_hours')

  let openingHoursString = await page.evaluate(() => {
    const elements = document.querySelectorAll('.c-card__opening_hours')
    return Array.from(elements).map((element) => (element as HTMLElement).innerText)
  })

  await browser.close()

  openingHoursString = openingHoursString.reverse()
  const openingHours = [];

  // jest -1 by nie parsować szkoły doktoranckiej
  for (let i = 0; i < openingHoursString.length-1; i++) {
    const hours = parse_opening_hours(openingHoursString[i], i+1)
    openingHours.push(hours)
  }

  return openingHours
}
