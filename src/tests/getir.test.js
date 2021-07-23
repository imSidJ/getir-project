const request = require('supertest');
const sinon = require('sinon');
const { getirService } = require('../services');

const app = require('../app');

describe('POST /getir', () => {
  const stub = sinon.stub(getirService, 'getData');

  it('should return success if no matching records found', async () => {
    const doc = [
      {
        key: 'ibfRLaFT',
        createdAt: '2016-12-25T16:43:27.909Z',
        totalCount: 2000,
      },
    ];

    stub.returns(Promise.resolve(doc));

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
        expect(res.body.code).toBe(0);
        expect(res.body.msg).toBe('Success');
      });
  });

  it('should return failed if no matching records found', async () => {
    stub.returns(Promise.resolve([]));

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
        expect(res.body.code).toBe(1);
        expect(res.body.msg).toBe('Failed');
      });
  });
});
