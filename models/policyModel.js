

const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({

      policy_number: {type: String, required: true},
      policy_mode: {type: Number, required: true},
      policy_type: {type: String, required: false},
      premium_amount: {type: Number, required: true},
      premium_amount_written: {type: String, required: false},
      policy_start_date: {type: String, required: false},
      policy_end_date: {type: String, required: false},
      

},{timestamps:true});

module.exports=mongoose.model('Policy',policySchema)