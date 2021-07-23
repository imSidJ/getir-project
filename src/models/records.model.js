const { Schema, model } = require('mongoose');

const recordSchema = new Schema(
  {
    key: String,
    value: String,
    counts: [Number],
  },
  {
    timestamps: true,
  }
);

const Record = model('Record', recordSchema);

module.exports = Record;
