<h1 align="center">GETIR PROJECT</h1>

## Swagger Documentation

- API documentation available at - <https://sid-getir-project.herokuapp.com/api-docs/>

## Get Started

**Install Dependencies**

```sh
# install the dependencies
npm ci
```

**Set Environment Variable**

Create a .env file in the root directory. Add the following values -

```
DATABASE_URL=<MongoDB URL>
PORT=<Server Port>
```

## Run It

**Run in _development_ mode:**

Runs the application is development mode. Should not be used in production

```sh
# nodemon src/server.js
npm run dev
```

**Run in _production_ mode:**

Start App

```sh
# start: node src/server.js
npm start
```

## Test It

Run the Jest unit tests

```sh
# test: jest
npm test
```
