var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Nakul, API is working properly');
    console.log(req.body);
});

module.exports = router;