# Budgeteer - standalone demo

A browser-only version of the original 2023 Budgeteer budgeting app created for Harvard's CS50. No Firebase or account is required.

## Run locally

```bash
npm install
npm run dev
```

## Data and privacy

Budgets and settings are saved to your browser's `localStorage` (`budgeteer-demo-v1`). They are **not** synced between browsers or devices. Clearing site data or using the reset control deletes the demo data. Avoid entering sensitive financial information into a shared browser.

## Features

- Monthly budgets and expenses
- Per-month income and expense overrides
- Default income and expense settings
- Year/month navigation and delete transactions
- Reset demo data from Settings

## Build

```bash
npm run build
npm run preview
```

## Tests

```bash
npm ci
npm test -- --run
```

Tests cover storage persistence and reset, malformed data handling, decimal balances, transaction creation/deletion, month isolation, and settings.
