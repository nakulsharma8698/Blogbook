var express = require('express') 
var app = express() 
const jwt = require('jsonwebtoken');
var router = express.Router();
var cloudinary = require('cloudinary').v2;
var bodyParser = require('body-parser'); 
var mysql = require('mysql') 
const cors = require('cors');
app.use(cors());
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
  
//const decoded = require('./loginblog');
//const auth= require('./authmiddle');
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());

var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "5tPYL3WW4H",
    password: "bpNBloeaZM",
    database: "5tPYL3WW4H"
  });
  con.connect(function(err) {
  if (err) throw err;
  console.log("Blog Connected!");
  });

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'public') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, Date.now() + '-' +file.originalname ) 
    } 
}); 
  const accessTokenSecret='iamnakul';
  const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    //console.log(authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } 
    else {
        res.sendStatus(401);
    }
};
var User="";
router.get('/', authenticateJWT, (req, res) => { 
    console.log(req.user.UserId);
    User=req.user.UserId;
    console.log(User);
    con.query('SELECT * FROM data', (err, rows, fields) => {
        if (!err)
        res.send(rows);
        else
        console.log(err);
    }); 
}); 

var upload = multer({ storage: storage }); 
require('dotenv').config();

cloudinary.config({ 
    cloud_name: 'nakul', 
    api_key: '147936936126268', 
    api_secret: 'sE7MC5nSI5ZkfsDUohr4S7hGjfo' 
  });

router.post('/',  upload.single('image'), (req, res) => { 
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        console.log(result);
        var sql = "insert into data values('"+ req.body.name +"', '"+ req.body.desc +"','"+ result.url +"', '"+ User+"')";
      con.query(sql, function(err){
          if(err) throw err
          res.send('Successfully Registered');
    
    });
});
}); 
module.exports = router;