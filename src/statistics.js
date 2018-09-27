/**
 * Module for obtaining descriptive information about a set of data.
 *
 * @author Jim Disenstam
 * @version 1.1.0
 */

'use strict'

/**
 * Returns the descriptive information (maximum, mean, median, minimum,
 * mode, range and standard deviation) from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {{maximum: number, mean: number, median: number, minimum: number, mode: number[], range: number, standardDeviation: number}}
 */
function descriptiveStatistics (numbers) {
  console.log(maximum(numbers))
  console.log(minimum(numbers))
  console.log(range(numbers))
  console.log(mean(numbers))
  console.log(median(numbers))
  console.log(standardDeviation(numbers))
  console.log(mode([4, 2, 5, 1, 2, 5, 3, 3, 3]))
}

function maximum (numbers) {
  let max = Math.max(...numbers)
  return max
}

function minimum (numbers) {
  let min = Math.min(...numbers)
  return min
}

function range (numbers) {
  let range = maximum(numbers) - minimum(numbers)
  return range
}

function mean (numbers) {
  let mean = numbers.reduce((a, b) => a + b, 0) / numbers.length
  return mean
}

function median (numbers) {
  let sortedNumbers = numbers.slice(0).sort(function (a, b) { return a - b }) // gör om till arrow function?
  let begin = Math.round(sortedNumbers.length / 2) - 1
  let end = begin + 2
  if (sortedNumbers.length % 2) {
    end = begin + 1
  }
  let median = mean(sortedNumbers.slice(begin, end))
  return median
}

function standardDeviation (numbers) {
  let numerator = numbers.map(function (a) {
    return Math.pow((a - mean(numbers)), 2)
  }) // gör om till arrow function?
  let standardDeviation = Math.sqrt(mean(numerator))
  return standardDeviation
}

function mode (numbers) { // försök förenkla denna!!!
  let sortedNumbers = numbers.sort((a, b) => (a - b))
  console.log(sortedNumbers)
  let previousNumber = ''
  let counter = 1
  let counterMax = 1
  let mode = []
  for (let i = 0; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] === previousNumber) {
      counter++
      if (counter > counterMax) {
        mode = [sortedNumbers[i]]
      }
      if (counter === counterMax) {
        mode.push(sortedNumbers[i])
      }
      counterMax = counter
    } else {
      previousNumber = sortedNumbers[i]
      counter = 1
    }
  }
  return mode
}

// Exports
exports.descriptiveStatistics = descriptiveStatistics
exports.maximum = maximum
exports.mean = mean
exports.median = median
exports.minimum = minimum
exports.mode = mode
exports.range = range
exports.standardDeviation = standardDeviation
