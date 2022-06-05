# Cryptocurrency_exchange_app 
Cryptocurrency_exchange_app is a Restful service written by Node.js.

## Features

- Get top moving cryptos and list all cryptocurrencies with more than +5% or less than -5% change over the last 24 hours
- Get top moving cryptos and convert price from USD to a specific currency based on user Input


## Tech-Stack

Cryptocurrency_exchange_app uses a number of open source projects to work properly:

- [Express](https://expressjs.com/)
- [Axios](https://www.npmjs.com/package/axios)
- [Jest](https://jestjs.io/)


## Installation

Install and build the dependencies and devDependencies.
```sh
npm install
```

run service

```sh
npm run start
```

## Run Tests
```sh
npm run test
```

## API Endpoints

|Endpoint          | What it does                                 | Request type |
|------------------|----------------------------------------------|--------------|
|/crypto   |return top movings cryptocurrency over last 24 hours. | GET|
|/crypto?convertFromId={convertFromId}&convertToId={convertToId}&amount={amount}|return top movings cryptocurrency over last 24 hours and convert price to specific fiat currency. | GET|