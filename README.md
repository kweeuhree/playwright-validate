# 🌐 Hacker News Article Scraper & Validator

This repository contains a Node.js-based web scraper that extracts the latest articles from Hacker News. The scraper fetches the articles and checks if they are sorted from newest to oldest based on their timestamps. The sorting validation is done using the validateSort function, ensuring that the articles are presented correctly.

Features:

- Scrapes the first 100 articles from Hacker News.
- Validates that articles are sorted from newest to oldest.
- Uses Playwright for scraping.
- Outputs whether the sorting succeeds or fails.

## 🧱 Project structure

`index.js` contains the main entry point of the application, handles the scraping, validation, and error logging.

`scraper.js` contains the logic for scraping Hacker News articles.

`validate.js` validates that the articles are sorted correctly.

`errorHandler.js` throws a formatted error.

## 🔍 Prerequisites

- Node.js
- npm

## ▶️ Usage

- Make sure all necessary dependencies are installed
- Clone or fork this repository
- In the project folder, run the following command:

```bash
node ./src/index.js
```

Example output:

```bash
EXACTLY the first 100 articles are sorted from newest to oldest // success
failed to validate sorting // failure
```
