
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root123@ds223343.mlab.com:23343/userapi');

const express = require('express');
const bodyParser = require('body-parser');

let {User} = require('./models/user');
let {Login} = require('./models/login');

let app = express();
const port = 3030;

app.use(bodyParser.json());


//the API accepts the users data in the form of JSON. THey have to enter username,email and password.
app.post('/create', (req, res) => {
    let user = new User({
      username: req.body.username,
      email:req.body.email,
      password:req.body.password      
    });
  
    user.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });
  

  //TO login the API requires username and password as JSON data.
  app.post('/login', (req, res) => {
    let login = new Login({
     
      email:req.body.email,
      password:req.body.password      
    });
  

    
    Login.findOne( {email: req.body.email, password:req.body.password}).then((log) => {
      
       if(!log){
           res.send("Invalid Credentials")
       }

        res.send(log + "\n\nLogin Success");
      });
  });
 
  //To reset their password the API accepts email and the new password in the form of JSON.
  app.post('/forgetandreset', (req, res) => {
    let login = new Login({
        email:req.body.email,
        password:req.body.password      
      });
    
    Login.findOneAndUpdate({email: req.body.email}, {$set: {email: req.body.email, password: req.body.password}} , {new:true} ).then( (fandr) => {

        res.send(fandr + "\n\nSuccessfully updated");

    });
  });


  app.listen(port, () => {
    console.log(`Started up at port ${port}`);
  });
  
  