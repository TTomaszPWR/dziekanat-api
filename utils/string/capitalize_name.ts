export function capitalizeName(str: string): string {
  return str
    .toLowerCase() // Convert the entire string to lowercase first
    .split(/\s+/) // Split the string into words on spaces
    .map((word) => {
      // Check if the word contains a hyphen
      if (word.includes('-')) {
        return word
          .split('-') // Split on hyphen
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1)) // Capitalize each part
          .join('-') // Join the parts back with hyphen
      }
      return word.charAt(0).toUpperCase() + word.slice(1) // Capitalize regular words
    })
    .join(' ') // Join the words back into a string
}
