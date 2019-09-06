const express = require('express');
const router = express.Router();
// body parser
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Express Validator
const { check , validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  let resultArray = [ { value: '',
    msg: '',
    param: '',
    location: '' } ];
  let user = {
    email : '',
    password : '',
    c_password : ''
  };
  res.render('index.ejs', {resultArray : resultArray , user : user});
});

/* POST for Registration Form */
router.post('/register',[
    check('email').isEmail(),
    check('password').isLength({min : 5}),
    check('c_password').custom((value,{req}) => {
       if(value !== req.body.password){
          throw Error;
        }
       else {
         return true;
       }
    })
    ], urlencodedParser, function(req, res, next) {
  let user = req.body;
  let resultArray = validationResult(req).errors;
  console.log(resultArray);
  res.render('index.ejs', {resultArray : resultArray , user : user});
});

module.exports = router;
