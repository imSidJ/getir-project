const express = require('express');

const getirRoutes = require('./getir.routes');

const router = express.Router();

router.use('/getir', getirRoutes);

module.exports = router;
