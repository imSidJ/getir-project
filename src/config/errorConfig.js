const errorList = {
  error_400: {
    invalid_params: {
      status: 400,
      message: "Invalid parameters in request.",
      error_code: "invalid_params",
    },
  },
  error_404: {
    resource_notFound: {
      status: 404,
      message: "Requested resource not found.",
      error_code: "resource_notFound",
    },
  },
  error_500: {
    server_error: {
      status: 500,
      message: "Internal server error.",
      error_code: "server_error",
    },
  },
};

module.exports = errorList;
