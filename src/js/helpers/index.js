function soundAccompaniment(src) {
  const audio = new Audio(src)
  audio.play()
}
/**
 *
 * @param {Array} arr
 * @returns {Object} question
 */
function getRandomQuestion(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
export { getRandomQuestion, soundAccompaniment }
