# Currencies Tracker

This is a personal project to showcase proficiencies in the following technologies:
Next.js, Typescript, Chakra UI, Express, PostgreSQL

APIs utilized:
Mapbox, FreeCurrencyAPI

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Getting Started](#getting-started)

## Overview

### The challenge

Users should be able to:

- View the optimal layout depending on their device's screen size
- Select desired currency and display the respective conversion rates and 24H changes of other currencies
- Click on available countries on the map to view row information
- Click on table columns to sort by column (asc/desc)

Currencies are updated daily and stored in a PostgreSQL database

### Links

[Currencies Tracker](https://www.currenciestracker.com/)

### Screenshot

![Landing Page](https://i.imgur.com/8FH1AuG.png)

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Chakra UI](https://v2.chakra-ui.com/) - Modular and accessible component library
- [Express](https://expressjs.com/) - Node.js web application framework
- [PostgreSQL](https://www.postgresql.org/) - Open source database

### What I learned

This project was an amazing opportunity to explore the possibilities of creating a interactive experience with Mapbox API. While it was initially meant to be a frontend project, I was quickly met with the challenge of API limits; particularly with FreeCurrencyAPI. While I may never hit the limit myself, I could see a world where it could potentially be a problem if I decided to update currencies more frequently and/or if multiple users hit the endpoint directly from the frontend.

I decided to mitigate this problem by implementing a backend. My Express server will make a singular request to the endpoint and store the information in the PostgreSQL database. The frontend will then make requests to the backend as needed.

## Getting Started

First, run the frontend:

```bash
cd frontend/

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Next, run the backend:

```bash
cd backend/
node src/server.js
```

Utilize endpoints at [http://localhost:4000](http://localhost:4000) with your browser to see the result.
