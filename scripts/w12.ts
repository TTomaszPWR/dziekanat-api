import * as cheerio from 'cheerio';
import axios from 'axios';

export async function scrapeWorkersW12() {
    const url = 'https://wefim.pwr.edu.pl/studenci/studia-1-i-2-stopnia/dziekanat';
    const listOfWorkers = [];
  
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const elements = $('td');
      let name = null;
      
      for (let i = 1; i < elements.length; i++) {
        const $element = cheerio.load(elements[i]).text()
        const element = $element.split("\n").filter(function(element) {
          return element !== "";
        });
        if(i % 2) {
          
          name = element[0].trim()
        }else{
          const contactInfo = element[0].split("email:")
          const worker = {
            name: name,
            tel: contactInfo[0].split('.')[1].replace(/\s+/g, ''),
            mail: contactInfo[1].trim(),
          };
          listOfWorkers.push(worker)
          
        }
        
      }
      console.log(listOfWorkers)
  
    } catch (error) {
      console.error('Error fetching the webpage:', error);
    }
  }