<h1 align="center">GETIR PROJECT</h1>

## Try Out

- View documentation and test API - <https://sid-getir-project.herokuapp.com/api-docs/>

## API Details

**Endpoint** - https://sid-getir-project.herokuapp.com/getir

**Method** - POST

**Headers** -

| key          | value                                |
| ------------ | ------------------------------------ |
| content-type | application/json                     |
| x-api-key    | d32a0a83-903e-4147-b399-f308c48f705e |

**Body** -

```
{
  "startDate": "2016-01-02",
  "endDate": "2018-02-02",
  "minCount": 2500,
  "maxCount": 3000
}
```

### **Rate Limit** - API has a rate limit of 15 requests per minute.

&nbsp;

&nbsp;

## Get Started With Development

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
API_KEY=<Key to access API>
```

&nbsp;

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

&nbsp;

## Test It

Run the Jest unit tests

```sh
# test: jest
npm test
```
