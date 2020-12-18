const express = require('express')
var mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors');
var cookieParser = require('cookie-parser');
var path = require('path');
var router = express.Router();
const bcrypt = require('bcrypt');

var session = require('express-session');
const port = 4000
app.use(cors());
var upload = require('./blogs.js');
var profile = require('./profile.js');
var register = require('./registerblog.js');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use('/upload', upload);
app.use('/create', register);
app.use('/profile', profile)
app.use(cookieParser());

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "5tPYL3WW4H",
  password: "bpNBloeaZM",
  database: "5tPYL3WW4H"
  });
  con.connect(function(err) {
  if (err) throw err;
  console.log("Login Connected!");
  });

  const  accessTokenSecret= 'iamnakul';
      app.post('/login',  function(req, res) {
        console.log(req.body);
        var UserId=req.body.UserId;
        var Password=req.body.Password;
        if (UserId && Password) {
          con.query('SELECT Password FROM register WHERE UserId = ? ', [UserId], function(err,results, fields) {
            if (results.length >0) {
              console.log(results[0].Password);
              bcrypt.compare(Password, results[0].Password, function (err, result) {
                if (result == true) {
                  const accessToken = jwt.sign({ UserId: req.body.UserId }, accessTokenSecret);
                  decoded = jwt.verify(accessToken, 'iamnakul',{complete: true});
                  console.log(decoded.payload); 
                  req.session.UserId = results[0].UserId;
                  //console.log(results[0].UserId);
                  req.session.UserId = UserId;
                  req.session.loggedin = true;
                  res.json({
                    accessToken, UserId
                  });
                } else {
                 res.send('Incorrect password');
                 res.redirect('/');
                }
              });
              
            } else {
              res.send('Incorrect Username and/or Password!');
              res.end();
            }			
            
          });
        } else {
          res.send('Please enter Username and Password!');
          res.end();
          
        }
     
    });



/* 
!!!!!-------- BCrypt Login------------------!!!!!
 if (UserId && Password) {
        con.query('SELECT Password FROM register WHERE UserId = ? ', [UserId], function(err,results, fields) {
          if (results.length >0) {
            console.log(results[0].Password);
            bcrypt.compare(req.body.password, results[0].Password, function (err, result) {
              if (result == true) {
                const accessToken = jwt.sign({ UserId: req.body.UserId }, accessTokenSecret);
                decoded = jwt.verify(accessToken, 'iamnakul',{complete: true});
                console.log(decoded.payload); 
                req.session.UserId = results[0].UserId;
                //console.log(results[0].UserId);
                req.session.UserId = UserId;
                req.session.loggedin = true;
                res.json({
                  accessToken, UserId
                });
              } else {
               res.send('Incorrect password');
               res.redirect('/');
              }
            });
            
          } else {
            res.send('Incorrect Username and/or Password!');
            res.end();
          }			
          
        });
      } else {
        res.send('Please enter Username and Password!');
        res.end();
        
      }

*/




    app.get('/logout',(req,res) => {
      req.session.destroy((err) => {
          if(err) {
              return console.log(err);
          }
          res.redirect('/');
      });
  
  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
//module.exports=global.decoded;