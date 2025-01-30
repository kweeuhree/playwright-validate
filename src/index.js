import { throwError, scrape, validateSort } from "./exports.js";

/**
 * Output messages of validation results.
 * @property {string} success - Success message when articles are sorted correctly.
 * @property {string} failure - Failure message when sorting validation fails.
 */
const output = {
  success: "EXACTLY the first 100 articles are sorted from newest to oldest",
  failure: "failed to validate sorting",
};

/**
 * Scrapes articles from Hacker News, validates the order, and logs the result.
 *
 * @async
 * @function sortHackerNewsArticles
 * @returns {string} A message indicating success or failure.
 * @throws {Error} Throws an error if the scraping or validation fails.
 */
async function sortHackerNewsArticles() {
  try {
    const articlesDateStrings = await scrape();
    if (articlesDateStrings) {
      const validationResult =
        validateSort(articlesDateStrings) === true
          ? output.success
          : output.failure;
      console.log(validationResult);
      return validationResult;
    }
  } catch (error) {
    throwError("failed at main function", error.message);
  }
}

// Call main function
sortHackerNewsArticles();
