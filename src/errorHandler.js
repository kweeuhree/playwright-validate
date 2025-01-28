/**
 * throwError() takes in a message and an error, formats them, and throws a new Error.
 *
 * @param {string} message - The custom message to be included in the error.
 * @param {Error} err - The original error that will be included in the thrown error.
 * @throws {Error} Throws a formatted error combining the message and the provided error.
 */
export const throwError = (message, err) => {
  throw new Error(`ERROR\t${message}:\n\t${err}`);
};
