var express = require('express');
var router = express.Router();

var bloodsugar = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("routed here");
  res.render('index', { title: 'BgBuddy' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* GET form to signin */
router.get('/signIn', function(req, res) {
    res.render('signin', { title: 'Sign In' });
});


router.post('/addExercise',function(req,res)
{
  var userId = req.body.objectID;
  var username = req.body.username;
  var minutes = req.body.minutes;
  var hours= req.body.hours;
  var score = req.body.score;

  var points = parseInt(hours)*60+parseInt(minutes);

  score = parseInt(score) + points;

  var db = req.db;
  var collection = db.get('usercollection');

  collection.findAndModify(
  {
      "query": { "_id": userId},

      "update":
      {
        $set:{
          "score" : score,
          }
      },
      "upsert" :true,
      "new" : true
      }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          var userData = {"score":score, "username": username, "points":points,"_id":userId};
          res.render('homepage', {user : userData});
      }
  });

});


router.post('/checkBoxes', function(req,res){
      var userId = req.body.userID;
      var score = parseInt(req.body.score);
      var username = req.body.username;
      var checkBoxes = req.body.Food;


      var arrayLength = checkBoxes.length;
      for (var i = 0; i < arrayLength; i++) {
        score += parseInt(checkBoxes[i]);
      }

      var db = req.db;
      var collection = db.get('usercollection');

      collection.findAndModify({
          "query": { "_id": userId},

          "update":
          {
            $set:{
              "score" : score,
              }
          },
          "upsert" :true,
          "new" : true
          }, function (err, doc) {
          if (err) {
              // If it failed, return error
              res.send("There was a problem adding the information to the database.");
          }
          else {
              // And forward to success page
              var userData = {"score":score, "username": username,"_id":userId};
              res.render('homepage', {user : userData});
          }
      });


    });


// When user enters blood sugar
router.post('/checkBG',function(req,res){
  var userId = req.body.objectID;
  var level = req.body.level;
  var score = req.body.score;
  var username = req.body.username;
  score = parseInt(score) +40;

  var datetime = new Date();
  var entry = [datetime,level];
  bloodsugar.push(entry);


    var data = "great";

    if (level < 70)
    {
      data = "low";
    }
    else if (level > 140)
    {
      data = "high";
    }

    var db = req.db;
    var collection = db.get('usercollection');

    collection.findAndModify({
        "query": { "_id": userId},

        "update":
        {
          $set:
          {
            "score" : score,


          }
        },
        "upsert" :true,
        "new" : true
        }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            var userData = {"score":score, "username": "haley", "level":data, "bloodsugar":bloodsugar, "_id":userId};
            res.render('homepage', {user : userData});
        }
    });


});


/*ensure user sign in and direct to start page*/
router.post('/logIn', function(req, res) {
    var db = req.db;

    var username = req.body.username;
    var password = req.body.password;

    var collection = db.get ('usercollection');

    //check if user exists

  collection.find({ "username": username, "password":password},{},function(e,docs){
      var entry = 0
      var id = "";

      for (var d in docs)
      {
          entry = 1;
      }

      if (entry == 1)
      {
        var user = collection.findOne({"username": username, "password":password});
        console.log (user.password);
        var userData = docs[0];
        console.log (userData);
        res.render('homepage', {user : userData});
      }
      else{
        res.redirect('signin');
      }
    });


});

router.post('/buy', function (req, res){
  var db = req.db;
  var userId = req.body.userId;
  var username = req.body.objectId;
  var price = req.body.price;
  var score = req.body.score;

  score = parseInt(score)- parseInt(price);

  var collection = db.get('usercollection');

  collection.findAndModify({
      "query": { "_id": userId},

      "update":
      {
        $set:{
          "score" : score,

          }
      },
      "upsert" :true,
      "new" : true
      }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          var userData = {"score":score, "username":username,"_id":userId};
          res.render('homepage', {user : userData});
      }
  });
});





/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var username = req.body.username;
    var email = req.body.email;
    var pass = req.body.password;
    var score = 0;
    var petName = req.body.petName;
    var diabetesType = req.body.diabetesType;
    var inventory = [];
    var birthday = req.body.birthday;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var bgLevels = [];

    // Set our collection
    var collection = db.get('usercollection');




    collection.find({ "username": username},{},function(e,docs){
      var entry = 0
      for (var d in docs)
      {
          entry = 1;
      }

      if (entry == 1)
      {
        console.log('username exists');
      }
      else {
        console.log('username does not exist');
        // Submit to the DB
        collection.insert({
            "username" : username,
            "email" : email,
            "password" : pass,
            "score":score,
            "petName": petName,
            "diabetesType": diabetesType,
            "inventory": inventory,
            "birthday": birthday,
            "firstName": firstName,
            "lastName": lastName,
            "bgLevels": bgLevels
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                console.log("here")
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // And forward to success page
                console.log("here");
                res.redirect('signin');
            }
        });
        }
      });


});


module.exports = router;
