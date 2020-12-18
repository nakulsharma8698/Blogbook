const express = require('express')
var mysql = require('mysql');
const bodyParser = require('body-parser')
const app = express()
var router = express.Router();
const cors = require('cors');
app.use(cors());
const bcrypt = require('bcrypt');
const saltRounds = 10;
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json());
const dp = "http://res.cloudinary.com/nakul/image/upload/v1601992060/ezupkmc5rvezctrpne52.webp";
//const register = express.Router();



var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "5tPYL3WW4H",
  password: "bpNBloeaZM",
  database: "5tPYL3WW4H"
  });
  con.connect(function(err) {
  if (err) throw err;
  console.log("Register Connected!");
  });
 
router.get('/profiles' , (req, res) => {
  con.query('SELECT * FROM register', (err, rows, fields) => {
  if (!err)
  res.send(rows);
  else
  console.log(err);
  })
  } );

  router.get('/profiles/:email' , (req, res) => {
    con.query('SELECT * FROM register WHERE UserId = ?',[req.params.email], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    } );

    router.post('/', (req, res) => {
       console.log(req.body);
       var UserId = req.body.UserId;
       var Password = req.body.Password;
      const yourPassword = req.body.Password;
          
          bcrypt.hash(yourPassword, saltRounds, (err, hash) => {
          // Now we can store the password hash in db.
          var sql = "insert into register values('"+ req.body.Name +"', '"+ req.body.UserId +"','"+ req.body.Phone +"','"+ hash +"', '"+dp+"')"
          con.query(sql, function(err){
            if(err) throw err
            res.send('Successfully Registered');

    
        })
        });
      });
       
     
module.exports = router;