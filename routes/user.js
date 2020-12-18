var express = require('express');
var mysql = require('mysql');
const app = express()
var router = express.Router();
router.get('/' , (req, res) => {
	//res.send("Hello BlogBook");
    if (req.session.loggedin) {
		res.send('Welcome back, ' + req.session.UserId + '!');
	} else {
		res.send('Please login to view this page!');
	}
	res.end();
    } );
module.exports = router;
