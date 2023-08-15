const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 8000;
const connectDB = require('./db/mongoose');
require('express-async-errors');
const errorHandlerMiddleware = require('./middleware/error_handler');
const e = require('express');


const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use('/', require('./routes'));

app.use(errorHandlerMiddleware);

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