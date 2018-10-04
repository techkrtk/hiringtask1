var mongoose = require('mongoose');
var Login = mongoose.model('Login', {
    
    
    email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 1
    }

});



module.exports = {Login}