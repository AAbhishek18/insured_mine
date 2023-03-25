//create user model for mongodb

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
      firstname: {type: String, required: true},
      email: {type: String, required: true},
      phone: {type: String, required: false},
      password: {type: String, required: true},
      gender:{type:String,enum:["Male","Female","Other"],required:false},
      address:{
            city:{type:String,required:false},
            state:{type:String,required:false},
            zip:{type:String,required:false},
      },
      dob:{type:String,required:false},

},{timestamps:true});

module.exports=mongoose.model('User',userSchema)//export user model


