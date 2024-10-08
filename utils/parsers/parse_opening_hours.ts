export function parse_opening_hours(hoursStr: string, deansOfficeId: number, ) {
  // Split the input string into lines
  const lines: string[] = hoursStr.split('\n')
  const openHours = []

  for (const element of lines) {
    const sign = firstOccurrence(element)
    const [day, ...rest] = element!.split(sign!)
    const part2 = rest
      .join(':')
      .replace(/[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]/g, '')
      .trim()

    if (!containsNumber(part2)) {
      openHours.push({
        deansOfficeId: deansOfficeId,
        dayOfWeek: parseDay(day),
      })
    } else {
      const hours = part2.split('-')

      openHours.push({
        deansOfficeId: deansOfficeId,
        dayOfWeek: parseDay(day),
        openHour: hours[0].trim(),
        closeHour: hours[1].trim(),
      })
    }
  }

  if (openHours.length === 5) openHours.push({
    deansOfficeId: deansOfficeId,
    dayOfWeek: 'saturday',
  })
  return openHours
}

function containsNumber(str: string) {
  const regex = /\d/
  return regex.test(str)
}

function firstOccurrence(str: string) {
  const dotIndex = str.indexOf('.')
  const colonIndex = str.indexOf(':')

  const firstIndex = Math.min(
    dotIndex === -1 ? Infinity : dotIndex,
    colonIndex === -1 ? Infinity : colonIndex
  )

  if (firstIndex === Infinity) {
    return null
  }

  return str[firstIndex]
}

const dayMapping: { [key: string]: string } = {
  pon: "monday",
  wt: "tuesday",
  śr: "wednesday",
  czw: "thursday",
  pt: "friday",
  sob: "saturday",
  nd: "sunday"  
};

function parseDay(polishAbbreviation: string): string {
  const englishDay = dayMapping[polishAbbreviation.toLowerCase()];
  if (englishDay) {
    return englishDay;
  } else {
    throw new Error("Invalid day abbreviation");
  }
}