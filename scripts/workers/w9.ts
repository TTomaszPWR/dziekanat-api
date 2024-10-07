import * as cheerio from 'cheerio';
import axios from 'axios';

export async function scrapeWorkersW9() {
    const url = 'https://wme.pwr.edu.pl/o-wydziale/struktura-organizacyjna/administracja-dziekanatu';
    const listOfWorkers = [];
  
    try {
      const response = await axios.get(url);
      const html = response.data;
      const $ = cheerio.load(html);
      const elements = $('tr');

      for (let i = 2; i < elements.length; i++) {
        const $elements = elements.eq(i).children();
        const info = $elements.eq(0).text();
        
        let $children = $elements.eq(1).html()
        if($children===null || $children.length === 0) continue;
        $children = $children.replaceAll('<br>','|')

        const children = cheerio.load($children).text().split("\n").filter(function(element) {
            return element !== "";
        });
        
        for (let i = 0; i < children.length; i++) {
            const elements = children[i].split('|');
            if(elements.length > 2){
                const worker = {
                    name: elements[0],
                    tel: elements[elements.length-2].split('tel.')[1].replace(/\D+/g, '').trim(),
                    mail: elements[elements.length-1].split('mail:')[1].trim(),
                    info: info
                }
                listOfWorkers.push(worker)
            }else{
                continue
            }
        }
      }
      console.log(listOfWorkers);
      
      return listOfWorkers
  
    } catch (error) {
      console.error('Error fetching the webpage:', error);
    }
}