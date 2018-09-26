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
  console.log(median([6, 2, 3, 5, 6, 1, 7]))
}

function maximum (numbers) {
  let max = numbers.reduce(function (a, b) { return Math.max(a, b) })
  return max
}

function minimum (numbers) {
  let min = numbers.reduce(function (a, b) { return Math.min(a, b) })
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
  let sortedNumbers = numbers.slice(0).sort(function (a, b) { return a - b })
  let begin = Math.round(sortedNumbers.length / 2) - 1
  let end = begin + 2
  if (sortedNumbers.length % 2) {
    end = begin + 1
  }
  let median = mean(sortedNumbers.slice(begin, end))
  return median
}
// Exports
exports.descriptiveStatistics = descriptiveStatistics
exports.maximum = maximum
exports.mean = mean
exports.median = undefined
exports.minimum = minimum
exports.mode = undefined
exports.range = range
exports.standardDeviation = undefined
