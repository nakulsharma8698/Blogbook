var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    res.send('Data Saved Successfully');
    //.log(req.body);
});

module.exports = router;