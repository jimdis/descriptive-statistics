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
  let result = {
    maximum: maximum(numbers),
    mean: mean(numbers),
    median: median(numbers),
    minumum: minimum(numbers),
    mode: mode(numbers),
    range: range(numbers),
    standardDeviation: standardDeviation(numbers)
  }
  return result
}

function sortNumbers (numbers) {
  if (!Array.isArray(numbers)) {
    throw TypeError('The passed argument is not an array.')
  }
  if (!numbers.length) {
    throw Error('The passed array contains no elements.')
  }
  if (!numbers.every(a => !isNaN(a))) {
    throw TypeError('The passed array contains not just numbers.')
  }
  let sortedNumbers = numbers.slice(0).sort(function (a, b) { return a - b })
  return sortedNumbers
}

function maximum (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let max = Math.max(...sortedNumbers)
  return max
}

function mean (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let mean = sortedNumbers.reduce((a, b) => a + b, 0) / sortedNumbers.length
  return mean
}

function median (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let begin = Math.round(sortedNumbers.length / 2) - 1
  let end = begin + 2
  if (sortedNumbers.length % 2) {
    end = begin + 1
  }
  let median = mean(sortedNumbers.slice(begin, end))
  return median
}

function minimum (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let min = Math.min(...sortedNumbers)
  return min
}

function mode (numbers) { // försök förenkla denna!!!
  let sortedNumbers = sortNumbers(numbers)
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

function range (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let range = maximum(sortedNumbers) - minimum(sortedNumbers)
  return range
}

function standardDeviation (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let numerator = sortedNumbers.map(function (a) {
    return Math.pow((a - mean(sortedNumbers)), 2)
  }) // gör om till arrow function?
  let standardDeviation = Math.sqrt(mean(numerator))
  return standardDeviation
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
