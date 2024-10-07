import * as cheerio from 'cheerio';
import axios from 'axios';

export async function scrapeWorkersW12() {
  const url = 'https://wefim.pwr.edu.pl/studenci/studia-1-i-2-stopnia/dziekanat';
  const listOfWorkers = [];

  const response = await axios.get(url);
  const html = response.data;
  const $ = cheerio.load(html);
  const elements = $('td');
  let name;
  let info;
  
  for (let i = 1; i < elements.length; i++) {
    const $element = cheerio.load(cheerio.load(elements[i]).html().replace('<br>', '|')).text()
    const element = $element.split("\n").filter(function(element) {
      return element !== "";
    });
    if(i % 2) {
      const nameAndTitle = element[0].split("|") 
      name = nameAndTitle[0].trim()
      info = nameAndTitle[1].trim()
    }else{
      const contactInfo = element[0].split("email:")
      const worker = {
        deansOfficeId: 12,
        name: name,
        phoneNumber: contactInfo[0].split('.')[1].replace(/[\s|]+/g, ''),
        email: contactInfo[1].trim(),
        info: info,
      };
      listOfWorkers.push(worker)
    }
  }
  return listOfWorkers
}