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
    minimum: minimum(numbers),
    mode: mode(numbers),
    range: range(numbers),
    standardDeviation: standardDeviation(numbers)
  }
  return result
}

/**
 * Takes an array of numbers and returns a sorted array of all numbers in the array, after testing for errors.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number[]} A sorted array of the numbers in the passed array.
 */

function sortNumbers (numbers) {
  if (!Array.isArray(numbers)) {
    throw TypeError('The passed argument is not an array.')
  }
  if (!numbers.length) {
    throw Error('The passed array contains no elements.')
  }
  if (!numbers.every(a => typeof a === 'number')) {
    throw TypeError('The passed array contains not just numbers.')
  }
  let sortedNumbers = numbers.slice(0).sort(function (a, b) { return a - b })
  return sortedNumbers
}

/**
 * Returns the maximum value from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The maximum value in the set of data.
 */

function maximum (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let max = Math.max(...sortedNumbers)
  return max
}

/**
 * Returns the mean value from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The mean value in the set of data.
 */

function mean (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let mean = sortedNumbers.reduce((a, b) => a + b, 0) / sortedNumbers.length
  return mean
}

/**
 * Returns the median value from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The median value in the set of data.
 */

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

/**
 * Returns the minimum value from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The minimum value in the set of data.
 */

function minimum (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let min = Math.min(...sortedNumbers)
  return min
}

/**
 * Returns the mode from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number[]} The mode in the set of data.
 */

function mode (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let previousNumber = ''
  let counter = 1
  let counterMax = 1
  let mode = sortedNumbers // If passed argument contains only one number the for loop will not alter mode.
  for (let i = 0; i < sortedNumbers.length; i++) {
    if (sortedNumbers[i] === previousNumber) {
      counter++
      if (counter > counterMax) {
        mode = [sortedNumbers[i]]
        counterMax = counter
      } else if (counter === counterMax) {
        mode.push(sortedNumbers[i])
      }
    } else {
      previousNumber = sortedNumbers[i]
      counter = 1
    }
  }
  return mode
}

/**
 * Returns the range from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The range in the set of data.
 */

function range (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let range = maximum(sortedNumbers) - minimum(sortedNumbers)
  return range
}

/**
 * Returns the standard deviation from a set of numbers.
 *
 * @param {number[]} numbers The set of data to be analyzed.
 * @throws {TypeError} The passed argument is not an array.
 * @throws {Error} The passed array contains no elements.
 * @throws {TypeError} The passed array contains not just numbers.
 * @returns {number} The standard deviation in the set of data.
 */

function standardDeviation (numbers) {
  let sortedNumbers = sortNumbers(numbers)
  let numerator = sortedNumbers.map(function (a) {
    return Math.pow((a - mean(sortedNumbers)), 2)
  })
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
