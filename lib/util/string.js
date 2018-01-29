const capitalizeWords = string => {
  let words = string.split(' ')
  words.forEach((word, index) => {
    word = word.charAt(0).toUpperCase() + word.slice(1)
    words[index] = word
  })
  return words.join(' ')
}

module.exports = { capitalizeWords }
