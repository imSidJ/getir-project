const responseHandler = (res, code, msg, records, statusCode) => {
  const body = {
    code,
    msg,
    records,
  };

  res.status(statusCode).send(body);
};

module.exports = responseHandler;
