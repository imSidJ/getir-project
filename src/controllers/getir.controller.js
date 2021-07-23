const { getirService } = require("../services");
const responseHandler = require("../helpers/responseHandler");

const getData = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await getirService.getData(data);

    if (response.length) responseHandler(res, 0, "Success", response, 200);
    else responseHandler(res, 1, "Failed", "No records found", 200);
  } catch (error) {
    next(error);
  }
};

module.exports = getData;
