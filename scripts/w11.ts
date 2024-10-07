import * as cheerio from 'cheerio';
import axios from 'axios';

export async function scrapeWorkersW11() {
    const url = 'https://wppt.pwr.edu.pl/studenci/dziekanat';
    const listOfWorkers = [];
  
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        let elements = $('tr');
    
        const firstIndex = 7;
        

        for (let i = firstIndex; i <= elements.length-1; i++) {
            let element = elements.eq(i).html();
            const children = elements.eq(i).children()
            if(children.length===1) {
                continue
            }
            element = element!.replaceAll("<br>", "|")
            const $element = cheerio.load(element)
            let text = $element.text().trim()
            if (text[text.length-1]==='|') text = text.slice(0, -1)
            const workerInfo = text.split("|");
            
            console.log(workerInfo)
            const tel = workerInfo[workerInfo.length-2].split("tel.")[1]

            const worker = {
                name: workerInfo[0].trim(),
                tel: tel.replace(/\s+/g, ''),
                mail: workerInfo[workerInfo.length-1].replaceAll('\n', ''),
                info: workerInfo[1].replace(/\(/g, '').split(")")[0].trim()
            }
            
            listOfWorkers.push(worker)
        }
        console.log(listOfWorkers);
        
        return listOfWorkers;
        
      } catch (error) {
        console.error('Error fetching the webpage:', error);
      }
    }