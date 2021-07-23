const errorList = {
  error_400: {
    invalid_params: {
      status: 400,
      message: 'Invalid parameters in request',
    },
  },
  error_404: {
    resource_notFound: {
      status: 404,
      message: 'Requested resource not found',
    },
  },
  error_500: {
    server_error: {
      status: 500,
      message: 'Internal server error',
    },
  },
};

module.exports = errorList;
