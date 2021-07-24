require('dotenv').config();
const request = require('supertest');
const sinon = require('sinon');

const { getirService } = require('../services');
const logger = require('../helpers/logger');
const app = require('../app');
const limiter = require('../middlewares/rateLimiter');

logger.level = 'silent';

describe('Check security', () => {
  it('should return 401 when API key is missing', (done) => {
    request(app)
      .post('/getir')
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).toBe('Invalid credentials provided.');
        return done();
      });
  });

  it('should return 401 when API key is incorrect', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .set('x-api-key', 'abcd1234')
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).toBe('Invalid credentials provided.');
        return done();
      });
  });
});

describe('Check request', () => {
  it('should return 400 when startDate is missing', (done) => {
    request(app)
      .post('/getir')
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .send({
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe("request.body should have required property 'startDate'");
        return done();
      });
  });

  it('should return 400 when startDate has incorrect format', (done) => {
    request(app)
      .post('/getir')
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-1',
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe(
          'request.body.startDate should match pattern "^\\d{4}-\\d{2}-\\d{2}$"'
        );
        return done();
      });
  });

  it('should return 400 when endDate is missing', (done) => {
    request(app)
      .post('/getir')
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe("request.body should have required property 'endDate'");
        return done();
      });
  });

  it('should return 400 when endDate has incorrect format', (done) => {
    request(app)
      .post('/getir')
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-02',
        endDate: '2018-02-0',
        minCount: 2500,
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe(
          'request.body.endDate should match pattern "^\\d{4}-\\d{2}-\\d{2}$"'
        );
        return done();
      });
  });

  it('should return 400 when minCount is missing', (done) => {
    request(app)
      .post('/getir')
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-01',
        endDate: '2018-02-02',
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe("request.body should have required property 'minCount'");
        return done();
      });
  });

  it('should return 400 when minCount has incorrect format', (done) => {
    request(app)
      .post('/getir')
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-01',
        endDate: '2018-02-02',
        minCount: '2500',
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe('request.body.minCount should be integer');
        return done();
      });
  });

  it('should return 400 when maxCount is missing', (done) => {
    request(app)
      .post('/getir')
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-02',
        endDate: '2018-02-02',
        minCount: 2500,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe("request.body should have required property 'maxCount'");
        return done();
      });
  });

  it('should return 400 when maxCount has incorrect format', (done) => {
    request(app)
      .post('/getir')
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-02',
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: '3000',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.message).toBe('request.body.maxCount should be integer');
        return done();
      });
  });
});

describe('Check Response', () => {
  const stub = sinon.stub(getirService, 'getData');

  it('should return success if matching records are found', async () => {
    const doc = [
      {
        key: 'ibfRLaFT',
        createdAt: '2016-12-25T16:43:27.909Z',
        totalCount: 2700,
      },
    ];

    stub.returns(Promise.resolve(doc));

    const expected = {
      code: 0,
      msg: 'Success',
      records: [
        {
          key: 'ibfRLaFT',
          createdAt: '2016-12-25T16:43:27.909Z',
          totalCount: 2700,
        },
      ],
    };

    await request(app)
      .post('/getir')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3000,
      })
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject(expected);
      });
  });

  it('should return failed if no matching records found', async () => {
    stub.returns(Promise.resolve([]));

    const expected = {
      code: 1,
      msg: 'Failed',
      records: 'No records found',
    };

    await request(app)
      .post('/getir')
      .send({
        startDate: '2016-01-26',
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3000,
      })
      .set('x-api-key', process.env.API_KEY)
      .set('content-type', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject(expected);
      });
  });
});
