var express = require('express');
var kifus = require('./kifus.js');
var router = express.Router();

router.use('/kifus', kifus);

module.exports = router;