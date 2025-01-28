import { chromium } from "playwright";

import { throwError } from "./exports.js";

// Define hacker news url
export const hackerUrl = "https://news.ycombinator.com/newest";

// Define desired length constants
export const ALMOST_DESIRED_LENGTH = 90;
export const DESIRED_LENGTH = 100;

/**
 * Scrapes the first 100 article date strings from Hacker News.
 *
 * The function launches a browser, navigates to the Hacker News "newest" page,
 * and gets the date strings of the articles.
 * It uses a do...while loop to scrape the articles per their availability(30 at a time),
 * clicking "More" button until it has collected the desired amount of date strings(100).
 *
 * @returns {Promise<string[]>} An array of ISO date strings representing the dates the articles were posted.
 * @throws {Error} Throws an error if the scraping fails.
 */
export const scrape = async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    // Go to Hacker News
    await page.goto(hackerUrl);
    // Initalize dateStrings array that will hold the resultant date strings
    const dateStrings = [];
    // Use do...while loop to get the first 100 dateStrings
    do {
      // Get 30 articles per iteration
      const datesOf30Articles = await page.evaluate(() => {
        // Get all spans containing span with "age" attribute
        const ageSpans = document.querySelectorAll("span.age");
        // Initalize a datesArray array that will hold a datesArray of dateStrings
        const datesArray = [];
        ageSpans.forEach((span) => {
          // Get span's datetime string, split by space to remove milliseconds
          const date = span.title.split(" ").slice(0, 1);
          // Push new date into the array
          datesArray.push(new Date(date).toISOString());
        });
        // Return current datesArray of date strings
        return datesArray;
      });

      // In order to get exactly 100 dateStrings, push all strings or only push 10
      dateStrings.length !== ALMOST_DESIRED_LENGTH
        ? dateStrings.push(...datesOf30Articles)
        : dateStrings.push(...datesOf30Articles.slice(0, 10));

      // Do not click the button unless necessary
      if (dateStrings.length < DESIRED_LENGTH) {
        await page.locator("a.morelink").click();
        // Ensure that more articles have loaded
        await page.waitForSelector("span.age", { state: "attached" });
      } else {
        break;
      }
      // Continue until dateStrings array achieves the desired length
    } while (dateStrings.length < DESIRED_LENGTH);

    return dateStrings;
  } catch (error) {
    throwError("failed scraping", error.message);
  } finally {
    // Close the browser
    await browser.close();
  }
};
