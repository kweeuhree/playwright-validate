/**
 * Validates if the array of date strings is sorted in descending order.
 *
 * @param {string[]} dateStrings - An array of date strings in ISO format.
 * @returns {boolean} - Returns true if the array is sorted in descending order, false otherwise.
 */
export const validateSort = (dateStrings) => {
  return dateStrings.every((element, index, arr) => {
    if (index === 0) return true;
    return arr[index] >= element;
  });
};
