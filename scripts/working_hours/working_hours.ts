import puppeteer from 'puppeteer'

export async function scrapeWorkingHours() {
  const url = 'https://przewodnik.pwr.edu.pl/pl/dziekanaty'

  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()

  await page.goto(url, { waitUntil: 'networkidle0' })

  await page.waitForSelector('.c-card__opening_hours')

  const openingHours = await page.evaluate(() => {
    const elements = document.querySelectorAll('.c-card__opening_hours')
    return Array.from(elements).map((element) => (element as HTMLElement).innerText)
  })

  await browser.close()

  return openingHours.reverse()
}
