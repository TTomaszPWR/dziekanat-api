export function parseOpeningHours(hoursStr: string) {
  
    // Split the input string into lines
    const lines: string[] = hoursStr.split('\n');
    const openHours: (Object | null)[] = []

    for (let i = 0; i < lines.length; i++) {
      const element = lines[i];
      const sign = firstOccurrence(element)
      const [, ...rest] = element!.split(sign!);
      const part2 = rest.join(':').replace(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, '').trim();

      if(!containsNumber(part2)){
        openHours.push(null)
      }else{

        const hours = part2.split("-")
        
        openHours.push({
          open: hours[0].trim(),
          close: hours[1].trim()
        })
      }
    }
    
    if(openHours.length === 5) openHours.push(null);
    return openHours;
  }
  

function containsNumber(str: string) {
  const regex = /\d/;
  return regex.test(str);
}

function firstOccurrence(str: string) {
  const dotIndex = str.indexOf('.'); 
  const colonIndex = str.indexOf(':');

  const firstIndex = Math.min(
    dotIndex === -1 ? Infinity : dotIndex, 
    colonIndex === -1 ? Infinity : colonIndex 
  );

  if (firstIndex === Infinity) {
    return null; 
  }

  return str[firstIndex]; 
}
  