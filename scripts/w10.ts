import * as cheerio from 'cheerio';
import axios from 'axios';

export async function scrapeWorkersW10() {
    const url = 'https://wm.pwr.edu.pl/pracownicy/administracja-wydzialu/zespol-ds-dydaktyki/studia-stacjonarne-2';
    const listOfWorkers = [];
  
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const elements = $('tr');

      
      for (let i = 1; i < 5; i++) {
        const $element = cheerio.load(elements[i]).text()

        const element = $element.split("\n").filter(function(element) {
          return element !== "";
        });

        const contactInfo = element[2].split('tel.')[1]
        const contactInfos = contactInfo.split('e-mail:')
        
        const worker = {
            name: element[0],
            tel: contactInfos[0].replace(/\D+/g, '').trim(),
            mail: contactInfos[1].trim(),
            info: element[1].trim()
        }

        listOfWorkers.push(worker)
      }
      console.log(listOfWorkers);
      
      
      return listOfWorkers
  
    } catch (error) {
      console.error('Error fetching the webpage:', error);
    }
  }