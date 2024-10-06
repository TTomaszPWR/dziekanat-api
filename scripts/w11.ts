import * as cheerio from 'cheerio';
import axios from 'axios';

export async function scrapeWorkersW12() {
    const url = 'https://wppt.pwr.edu.pl/studenci/dziekanat';
    const listOfWorkers = [];
  
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let elements = $('');
    
        let info = null;
    
        const firstIndex = 3;
    
        for (let i = firstIndex; i <= elements.length-firstIndex; i++) {
        
          let element = elements.eq(i).html();
          const children = elements.eq(i).children()
          if(children.length===1) {
              const $info = cheerio.load(element!);
              info = $info.text().split("\n")[0].trim();
              continue
          }
          element = element!.replaceAll("<br>", "|")
          
          const $element = cheerio.load(element)
          const text = $element.text()
          const workerInfo = text.split("\n").filter(function(element) {
              return element !== "";
          });
          const workerRestInfo = workerInfo[1].split("|");
          const worker = {
              name: workerInfo[0],
              tel: workerRestInfo[1].split('.')[1].replace(/\s+/g, ''),
              mail: workerRestInfo[2].split(':')[1].replace(/\s+/g, ''),
              info: info
          };
          listOfWorkers.push(worker)
        }
        
        return listOfWorkers;
        
    
      } catch (error) {
        console.error('Error fetching the webpage:', error);
      }
    }