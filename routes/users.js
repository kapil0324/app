var express = require('express');
var router = express.Router();
var Orders=require('../model/user');
var session = require('express-session');
var query=Orders.find({});
const {check, validationResult } = require('express-validator/check');
const { matchedData,sanitize } = require('express-validator/filter');
/* GET users listing. */
router.use(session({
  secret: 'jhjgfjdg^^%%$$###$^',
  resave: false,
  saveUninitialized: true
}));

router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get('/registration', function(req, res, next) {
  res.render('registration');
});

router.post('/login',function(req,res){
   Orders.find({email : req.body.email }, function (err, data) {
  if(err) { return handleError(res, err); }
     session=req.session;
     session.UniqueId="kapil";
    //return res.json(200, data);
    res.render('dashboard',{data:data});
   });
});
router.get('/session',(req,res)=>{
     session=req.session;
      if(req.session.UniqueId=="kapil"){
     res.send(req.session.UniqueId);
      }else{
         res.redirect('/users/login');
      }
});
router.get('/logout',(req,res)=>{
     session=req.session;
    // console.log(req.session.UniqueId);
     if(req.session.UniqueId=="kapil"){
      
       console.log(req.session.UniqueId);
    req.session.destroy(function(err) {
    res.redirect('/');
     });
      // res.render('index');
     }else{
      res.redirect('/users/login');
     }
});
router.post('/registration',
   [
     check('email',"Please Enter email").isEmail(),
     check('password').custom((value, { req }) => {
      if (value =="") {
        throw new Error('Please Enter Password ');
      }else{
          return true;
      }
      }),
     check('username').custom((value, { req }) => {
      if (value =="") {
        throw new Error('Please Enter username');
      }else{
          return true;
      }
      }),
       check('address').custom((value, { req }) => {
      if (value =="") {
        throw new Error('Please Enter address ');
      }else{
          return true;
      }
      }),
       check('phone').custom((value, { req }) => {
      if (value =="") {
        throw new Error('Please Enter phone ');
      }else{
          return true;
      }
      }),
   ],
(req,res)=>{
	const errors = validationResult(req);
  if (!errors.isEmpty()) {

  	const user=matchedData(req);
  	console.log(errors.mapped());
    res.render('registration',{title:"Registration form",errors: errors.mapped(),user: user});
  }else{
  	const user=matchedData(req);
     var newRecord= new Orders({
    	username: req.body.username,
    	email:  req.body.email,
    	password: req.body.password,
    	address: req.body.address,
    	phone: req.body.phone,
    })
   newRecord.save(function(err, doc){
      if(err) throw err;
      query.exec( function(err, doc){
		if(err) throw err;
		//console.log(doc);
		res.render('login',{msg:"Registration  Successfully Added !"});
	    })
    })
  	
  }

})



module.exports = router;
