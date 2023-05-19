const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const  mongoose  = require('mongoose');
const route = require('./routes/routes');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();//for import env variables

// connect to mongodb database
mongoose.connect(process.env.MONGO_URL,
       { useNewUrlParser: true, 
        useUnifiedTopology: true
       }).then(() => console.log('MongoDB is Connected!'))
         .catch(err=>console.log(err));

//cors 
// app.use(cors( 
//   {origin: 'http://localhost:3000', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization','application/json']
//   }
// ));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



 app.use('/api',route);
//app is listening on port 3000
app.all('*',(req,res)=>{
  res.status(404).json({status:false,message:"API not found"})
 
})
app.listen( process.env.PORT ||4000, () => {
    console.log("Server is running on port "+(process.env.PORT ||4000) );
});



