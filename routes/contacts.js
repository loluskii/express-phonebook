var express = require('express');
var router = express.Router();
var dbcon = require('../lib/db');

/* GET home page. */
router.get('/list', function(req, res, next) {

  dbcon.query('SELECT * FROM contacts', function(err, rows){
    
    if(err){
      req.flash('error',err);

      res.render('contacts', {data: ''})
    }else{

      res.render('contacts', {data:rows});
    }
  })
  
});

router.get('/create-contact', function(req, res, next) {    
  // render to add.ejs
  res.render('contacts/add', {
    name : '',
    address : '',
    email : '',
    phone_number : '',
    birthday : ''
  })
})


router.post('/create-contact', function(req, res, next){
  let name = req.body.name;
  let address = req.body.address;
  let email = req.body.email;
  let phone_number = req.body.phone_number;
  let birthday = req.body.birthday;
  let errors = false;

  if(name.length === 0 || phone_number.length > 11){
    errors = true;

  }else if(!errors){

    var form_data = {
      name : name,
      address : address,
      email : email,
      phone_number : phone_number,
      birthday : birthday
    }

    dbcon.query('INSERT INTO contacts SET ?', form_data, function(err, result){
      if(err){
        req.flash('error', err)

        res.render('contacts/add',{
          name : form_data.name,
          address : form_data.address,
          email : form_data.email,
          phone_number : form_data.phone_number,
          birthday : form_data.birthday
        })
      }else{
        req.flash('success', 'Contact successfully added');
        res.redirect('/contacts/list');
      }
    })
  }
  

})


router.get('/edit/(:id)', function(req, res, next) {

  let id = req.params.id;
 
  dbcon.query('SELECT * FROM contacts WHERE id = ' + id, function(err, rows, fields) {
      if(err) throw err
       
      // if user not found
      if (rows.length <= 0) {
          req.flash('error', 'Contact not found with ID = ' + id)
          res.redirect('/list')
      }
      // if number found
      else {
          // render to edit.ejs
          res.render('contacts/edit', {
              title: 'Edit Contact',
              id: rows[0].id, 
              name : rows[0].name,
              address : rows[0].address,
              email : rows[0].email,
              phone_number : rows[0].phone_number,
              birthday : rows[0].birthday
          })
      }
  })
})


router.post('/update/(:id)', function(req, res, next) {


  let name = req.body.name;
  let address = req.body.address;
  let email = req.body.email;
  let phone_number = req.body.phone_number;
  let birthday = req.body.birthday;
  let errors = false;

  if(name.length === 0 || phone_number.length > 11) {
      errors = true;
      
      // set flash message
      req.flash('error', "Please enter correct name or phone number");
      // render to add.ejs with flash message
      res.render('contacts/edit', {
          name: name,
          phone_number: phone_number
      })
  }

  // if no error
  if( !errors ) {   

      var form_data = {
        name : name,
        address : address,
        email : email,
        phone_number : phone_number,
        birthday : birthday
      }
      // update query
      dbcon.query('UPDATE contacts SET ? WHERE id = ' + id, form_data, function(err, result) {
          //if(err) throw err
          if (err) {
              // set flash message
              req.flash('error', err)
              // render to edit.ejs
              res.render('contacts/edit', {
                name: form_data.name,
                phone_number: form_data.phone_number
              })
          } else {
              req.flash('success', 'Contact successfully updated');
              res.redirect('/contacts/list');
          }
      })
  }
})
 


module.exports = router;
