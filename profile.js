const express = require('express')
var mysql = require('mysql');
const bodyParser = require('body-parser')
const app = express()
var router = express.Router();
//var blogs = require('./blogs.js');
const cors = require('cors');
app.use(cors());
var cloudinary = require('cloudinary').v2;
var fs = require('fs'); 
var path = require('path'); 
var multer = require('multer'); 
const { Console } = require('console');

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
//app.use(blogs.User);
//var User = blogs.User;


var con = mysql.createConnection({
    host: "remotemysql.com",
    user: "5tPYL3WW4H",
    password: "bpNBloeaZM",
    database: "5tPYL3WW4H"
  });
  con.connect(function(err) {
  if (err) throw err;
  console.log("Profile Connected!");
  });
 
router.get('/' , (req, res) => {
  con.query('SELECT * FROM register', (err, rows, fields) => {
  if (!err)
  res.send(rows);
  else
  console.log(err);
  })
  } );

  /*const accessTokenSecret='iamnakul';
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
  };*/
  var User="";
  router.get('/:email' ,(req, res) => {
    User=req.params.email;
    con.query('SELECT * FROM register WHERE UserId = ?',[req.params.email], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );



    

 var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'public') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, Date.now() + '-' +file.originalname ) 
    } 
});
var upload = multer({ storage: storage }); 
cloudinary.config({ 
    cloud_name: 'nakul', 
    api_key: '147936936126268', 
    api_secret: 'sE7MC5nSI5ZkfsDUohr4S7hGjfo' 
  });
//var us="";
router.post('/update', upload.single('image'), (req, res) => { 
    console.log(User);
    cloudinary.uploader.upload(req.file.path, function(error, result) {
        console.log(result);
        var sql = "update register set dp = '" + result.url +"' where UserId = '"+ User +"' "; //insert into data values('"+ req.body.name +"', '"+ req.body.desc +"','"+ result.url +"', '"+ User+"')";
      con.query(sql, function(err){
          if(err) throw err
          res.send('Updated Successfully ');
    
    });
});
});



    router.get('/post/:email' , (req, res) => {
      con.query('SELECT * FROM data WHERE UserId = ?',[req.params.email], (err, rows, fields) => {
      if (!err)
      res.send(rows);
      else
      console.log(err);
      })
      } );
    module.exports = router;