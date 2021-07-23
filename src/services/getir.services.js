const Record = require('../models/records.model');

const getData = async ({ startDate, endDate, minCount, maxCount }) => {
  try {
    const res = await Record.aggregate([
      {
        $match: {
          $and: [
            {
              createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
            },
            { $expr: { $gt: [{ $sum: '$counts' }, minCount] } },
            { $expr: { $lt: [{ $sum: '$counts' }, maxCount] } },
          ],
        },
      },

      {
        $project: {
          _id: 0,
          key: 1,
          createdAt: 1,
          totalCount: { $sum: '$counts' },
        },
      },
    ]);

    return res;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { getData };
