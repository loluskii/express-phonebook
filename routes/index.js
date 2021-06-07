var express = require('express');
var router = express.Router();
var dbcon = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Contact Application' });
});

router.post('/login', function(req, res, next) {
  res.redirect('/contacts/list')

  // let email = req.body.email;
  // let password = req.body.password;
  // let errors = false;

  // if(!email || !password ){
  //   errors = true;

  //   req.flash('error', "Please fill in all fields");

  // }else if(!errors){

  //   var form_data = {
  //     email : email,
  //     password : password,
  //   }

    

    // dbcon.query('SELECT * FROM users WHERE email = ' + email, function(err, rows, fields) {
    //   if(err) throw err
       
    //   // if user not found
    //   if (rows.length <= 0) {
    //       req.flash('error', 'Email not found!')
    //       res.redirect('/login')
    //   }
    //   // if number found
    //   else {
    //     let result_email = rows[0].email;
    //     let result_pass = rows[0].password;

    //     if(result_email === email){
    //       if(result_pass == password){
    //         req.flash('success', 'Welcome!')
    //         res.redirect('/contacts/list')
    //       }
    //     }else{
    //       req.flash('error', 'Email or password failed!')
    //       res.redirect('/login')
    //     }
    //   }
    // })
  //}
  

});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Create your Account' });
});

router.post('/register', function(req, res, next) {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  let errors = false;

  if(username.length === 0 || password.length < 5){
    errors = true;

    req.flash('error', "Password should be more than 5 characters!");

    res.render('register',{
      username : username,
      email : email,
      password : password
    })

  }else if(!errors){

    var form_data = {
      username : username,
      email : email,
      password : password,
    }

    dbcon.query('INSERT INTO users SET ?', form_data, function(err, result){
      if(err){
        req.flash('error', err)

        res.render('register',{
          username : form_data.username,
          email : form_data.email,
          password : form_data.password
        })
      }else{
        req.flash('success', 'Registration Successful. You can login');
        res.redirect('/');
      }
    })
  }
  
});

module.exports = router;
