

const mongoose = require('mongoose');

     const accountSchema = new mongoose.Schema({
                agent: {type: String, required: true},
                  producer: {type: String, required: false},
                  company_name: {type: String, required: true},
                  category_name: {type: String, required: false},
                 csr: {type: String, required: false},
                  account_name: {type: String, required: false}, 
                  account_type: {type: String, required: false}, 
     },{timestamps:true});

      module.exports=mongoose.model('Account',accountSchema)