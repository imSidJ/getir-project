const request = require('supertest');
const sinon = require('sinon');
const { getirService } = require('../services');
const logger = require('../helpers/logger');

const app = require('../app');

logger.level = 'silent';

describe('Check request', () => {
  it('should return 400 when startDate is missing', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .send({
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.reason).toBe('Invalid parameters in request');
        return done();
      });
  });

  it('should return 400 when endDate is missing', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.reason).toBe('Invalid parameters in request');
        return done();
      });
  });

  it('should return 400 when minCount is missing', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-01',
        endDate: '2018-02-02',
        minCount: 2500,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.reason).toBe('Invalid parameters in request');
        return done();
      });
  });

  it('should return 400 when maxCount is missing', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .send({
        startDate: '2018-02-02',
        endDate: '2018-02-02',
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.reason).toBe('Invalid parameters in request');
        return done();
      });
  });

  it('should return 400 when startDate has invalid format', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .send({
        startDate: '2016-01-2',
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.reason).toBe('Invalid parameters in request');
        return done();
      });
  });

  it('should return 400 when endDate has invalid format', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .send({
        startDate: '2016-01-02',
        endDate: '2018-02-1',
        minCount: 2500,
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.reason).toBe('Invalid parameters in request');
        return done();
      });
  });

  it('should return 400 when minCount has invalid format', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .send({
        startDate: '2016-01-02',
        endDate: '2018-02-02',
        minCount: '2500',
        maxCount: 3000,
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.reason).toBe('Invalid parameters in request');
        return done();
      });
  });

  it('should return 400 when maxCount has invalid format', (done) => {
    request(app)
      .post('/getir')
      .set('content-type', 'application/json')
      .send({
        startDate: '2016-01-02',
        endDate: '2018-02-02',
        minCount: 2500,
        maxCount: '3000',
      })
      .expect(400)
      .end((err, res) => {
        expect(res.body.reason).toBe('Invalid parameters in request');
        return done();
      });
  });
});

describe('Check Response', () => {
  const stub = sinon.stub(getirService, 'getData');

  it('should return success if no matching records found', async () => {
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
      .set('content-type', 'application/json')
      .expect(200)
      .then((res) => {
        expect(res.body).toMatchObject(expected);
      });
  });
});
