var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Nakul, API is working properly');
});

module.exports = router;
/*
{
"Name":"Munna",
"Email":"munna@munni",
"Phone":"987235464",
"City": "Hyderabad",
"Password": "abcd"
} */