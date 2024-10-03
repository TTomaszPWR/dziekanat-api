import * as cheerio from 'cheerio';
import axios from 'axios';
import puppeteer from 'puppeteer';

export async function scrapeWorkersW14() {
  const url = 'https://wmed.pwr.edu.pl/o-wydziale/struktura-organizacyjna/dziekanat';

  try {
    const response = await axios.get(url);
    const html = response.data; // Get the HTML from the response
    const $ = cheerio.load(html); // Load HTML into Cheerio

    // Extract working hours using Cheerio's selectors
    const $text = $('div.text p');

    const listOfWorkers = [];
    
    for (let i = 3; i <= 5; i++) {
        let text = $text.eq(i).html()

        if(text!=null){
            text = text.split('</a>')[0].trim() + '<a/>';

            const arr = text.split('<br>')

            for (let i = 0; i < arr.length; i++) {
                let line = cheerio.load(arr[i]);
                arr[i] = line.text();
            }

            
            const worker = {
                name: arr[1],
                tel: arr[2].split('.')[1].replace(/\s+/g, ''),
                mail: arr[3].split(':')[1].replace(/\s+/g, ''),
                info: arr[0]
            };

            listOfWorkers.push(worker)
        }
    }

    

    return listOfWorkers;

  } catch (error) {
    console.error('Error fetching the webpage:', error);
  }
}

export async function scrapeWorkingHoursW14() {
  const url = 'https://przewodnik.pwr.edu.pl/pl/dziekanaty';

  // Launch the browser in headless mode
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
   // Navigate to the page
  await page.goto(url); // Replace with your target URL
   // Wait for the element with the class "c-card__opening_hours" to appear
  await page.waitForSelector('.c-card__opening_hours');
   // Extract the content of the div
  const openingHours = await page.evaluate(() => {
    const element = document.querySelector('.c-card__opening_hours') as HTMLElement;
    return element ? element.innerText : null;
  });
   // Close the browser
  await browser.close();

  return openingHours;
}