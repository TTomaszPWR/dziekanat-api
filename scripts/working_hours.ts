import puppeteer from 'puppeteer';

export async function scrapeWorkingHours() {
    const url = 'https://przewodnik.pwr.edu.pl/pl/dziekanaty';
  
    // Launch the browser in headless mode
    const browser = await puppeteer.launch({
      headless: false
    });
    const page = await browser.newPage();
     // Navigate to the page
    await page.goto(url, {waitUntil: 'networkidle0'}); // Replace with your target URL
     // Wait for the element with the class "c-card__opening_hours" to appear
    await page.waitForSelector('.c-card__opening_hours');
     // Extract the content of the div
    const openingHours = await page.evaluate(() => {
      const elements = document.querySelectorAll('.c-card__opening_hours');
      return Array.from(elements).map(element => (element as HTMLElement).innerText);
    });
     // Close the browser
    await browser.close();
  
    return openingHours.reverse();
  }
  