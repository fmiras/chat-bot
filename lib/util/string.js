const capitalizeWords = string => {
  return string
    .split(' ')
    .map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

module.exports = { capitalizeWords }
