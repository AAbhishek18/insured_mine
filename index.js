const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const  mongoose  = require('mongoose');
const route = require('./routes/routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();//for import env variables

// connect to mongodb database
mongoose.connect(process.env.MONGO_URL,
       { useNewUrlParser: true, 
        useUnifiedTopology: true
       }).then(() => console.log('MongoDB is Connected!'))
         .catch(err=>console.log(err));


 app.use('/api',route);
//app is listening on port 3000
app.listen( process.env.PORT ||3000, () => {
    console.log("Server is running on port "+(process.env.PORT ||3000) );
});



