const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 8000;
const connectDB = require('./db/mongoose');
require('express-async-errors');

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use('/', require('./routes/user'));

const start = async() => {
    try {
         await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port:${port}`);
        })
    } catch (error) {
        console.log(error);
    }
  

}

start();