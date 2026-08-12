# Streaks

[![Netlify Status](https://api.netlify.com/api/v1/badges/63fa44fa-0527-46ce-8334-24ea1964f15b/deploy-status)](https://app.netlify.com/projects/streaks-app/deploys)

Streaks is a habit-tracking web application that helps dedicated folks achieve their goals by maintaining... well, _streaks_! It's about showing up and "[not breaking the chain](https://lifehacker.com/jerry-seinfelds-productivity-secret-281626)", as Jerry Seinfeld would put it.

## Motivation

Regular to-do lists don't indicate for how long you've been going at something. Meanwhile, building momentum is the key to long-term success. This is why I'm building _Streak_—to make momentum feel tangible.

## Quick Start

To start using _Streak_, head on over to https://streaks.fyi and either:

- Sign up if you don't already have an account.
- Log in if you do.

You can then start creating new habits and marking them as "done" for the day. Your active streak will appear alongside each habit.

## Usage

The side navigation has two tabs:

- **Dashboard**: Where you see your habits for today, as well as the active streak for that habit.
- **Habits**: Where all of your existing habits are listed, and where you can edit them (e.g. change their name or update their state) or create new ones.

## Contributing

To run this application:

```bash
pnpm install
pnpm dev
```

To create a production build, run:

```bash
pnpm build
```

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
pnpm test
```

This project uses [Oxlint](https://oxc.rs/docs/guide/usage/linter.html) and [Oxfmt](https://oxc.rs/docs/guide/usage/formatter.htmlprettier) for linting and formatting. The following scripts are available:

```bash
pnpm lint
pnpm format
pnpm check
```
