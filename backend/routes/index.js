const express = require('express');
const router = express();
const User = require('../models/User');
const Counter = require('../models/Counter')

//444 code for no access 
//445 code for name duplicate
/* GET home page. */

router.get('/Share/', function (req, res, next) {
  console.log(req.query.id)
  Counter.findOne({ _id: req.query.id }, function (err, counter) {
  if(counter != null){
    console.log(counter.Value);
    res.set('Content-Type', 'text/html');
    res.send(new Buffer(`<link rel="stylesheet" href="../stylesheets/style.css">
    <div class="main" id = "counter_share_table">
    <h2 class="sign" align="center" >Welcome to Countr Sharing</h2>
    <p class="sign_in" align="center" id = "text_header">Counter Value: </p>
    <p class="sign_in" align="center" id = "text_value">${counter.Value} </p>
    <form class="form1" onSubmit="return false;">
   
  </div>`));
  }
  });
});


router.post('/Share', function (req, res, next) {  
  console.log("In /Share POST");
  let counter = new Counter();
  counter.set({ Value: req.body.val });
  counter.save();
  res.send(counter)

});




router.get('/', function (req, res, next) {
  res.render('index', { title: 'Front Page' });
});

//for log off use
router.post('/LogOff', function (req, res) {
  req.session.destroy(function (err) {  
   res.status(200).json({ success: true, msg: 'user logged off' });
  });
});

router.get('/Counters', function (req, res, next) {
  if (req.session.Auth) {
    User.findOne({ Username: req.session.Auth }, function (err, user) {
      if (user !== null){
        let countArray = user.countArray;
        // console.log(countArray);
        // console.log(req.query);
        res.json({body: countArray});
      }
      else
        res.status(444).json({ success: false, msg: 'Couldnt get counter' }); 
    });
  }
  else 
    res.status(444).json({ success: false, msg: 'no access' });
  });


  router.put('/Counters', function (req, res) {
    console.log(req.session)
    if (req.session.Auth) {
      console.log(req.session.Auth)
      User.findOne({ Username: req.session.Auth }, function (err, user) {
        
        if (user == null) {
          res.status(444).json({ success: false, msg: 'null' });
        }
     
        else {
          // console.log("In router");
          // console.log(req.body);
          User.countArray = req.body;
          let count_array_update = req.body;
          user.set({ countArray: count_array_update });
          user.save();
          res.send(user);
         
        }
      });
    }
    else res.status(444).json({ success: false, msg: 'something wrong' });
  });

  router.delete('/Counters', function (req, res) {
    console.log(req.session)
    if (req.session.Auth) {
      console.log(req.session.Auth)
      User.findOne({ Username: req.session.Auth }, function (err, user) {
        
        if (user == null) {
          console.log("Delete error");
          res.status(444).json({ success: false, msg: 'null' });
        }
     
        else {
          // console.log("In router");
          // console.log(req.body);
          let count_array_update = user.countArray;
          let index = req.body.i;
          console.log(`Index: ${index}`)
          count_array_update.splice(index, 1)
          console.log(count_array_update);
          user.set({ countArray: count_array_update });
          user.save();
          res.send(user);

          // res.send(user);
         
        }
      });
    }
    else {
      console.log("Delete error");

      res.status(444).json({ success: false, msg: 'something wrong' });
    }
  });

//for session use
router.get('/Session', function (req, res, next) {
  if (req.session.Auth) {
    User.findOne({ Username: req.session.Auth }, function (err, user) {
      if (user !== null)
        res.status(200).json({ success: true, msg: ' you are logged in' });
      else
        res.status(444).json({ success: false, msg: 'no access' }); 
    });
  }
  else 
    res.status(444).json({ success: false, msg: 'no access' });
  });

  router.get('/User', function (req, res, next) {
    if (req.session.Auth) {
      User.findOne({ Username: req.session.Auth }, function (err, user) {
        if (user == null){
         res.status(444).json({ success: false, msg: 'not registered' }); 
         }
        else{ 
          res.send(user);
        }
      });
    }
    else 
      res.status(444).json({ success: false, msg: 'no access' });
    });



router.post('/SignUp', function (req, res) {

  User.findOne({ Username: req.body.Username }, function (err, user) {
    if (user == null){
      var user = new User();
      user.set({ Username: req.body.Username });
      user.set({ password: req.body.password });
      user.set({countArray: req.body.countArray});
      user.save();
      req.session.Auth = req.body.Username
      res.send(user)
    
    }
    else {
      res.status(444).json({ success: false, msg: 'username duplicated' });
    }
  });
});

router.post('/SignIn', function (req, res) {
  User.findOne({ Username: req.body.Username }, function (err, user) {
    if (user !== null) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) res.status(444).json({ success: false, msg: 'Error:  Incorrect Password' });
        else if (isMatch) {
          req.session.Auth = req.body.Username
          res.send(user);
        }
        else {
          res.status(444).json({ success: false, msg: 'Error:  Incorrect Password' });
        }
      });
    }
    else
      res.status(444).json({ success: false, msg: 'Uerror: User does not exist' });
  });
});


module.exports = router;
