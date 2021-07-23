const express = require('express');

const { getirController } = require('../controllers');

const router = express.Router();

router.post('/', getirController);

module.exports = router;
