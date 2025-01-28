import { throwError, scrape, validateSort } from "./index.js";

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
 * This function performs the following steps:
 * 1. Scrapes the article dates from Hacker News.
 * 2. Validates whether the articles are sorted in descending order (newest to oldest).
 * 3. Logs and returns a message based on the validation result.
 *
 * @async
 * @function sortHackerNewsArticles
 * @returns {Promise<string>} A message indicating success or failure.
 * @throws {Error} Throws an error if the scraping or validation fails.
 */
async function sortHackerNewsArticles() {
  try {
    const articlesDateStrings = await scrape();
    if (articlesDateStrings) {
      const validationResult = validateSort(articlesDateStrings)
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
