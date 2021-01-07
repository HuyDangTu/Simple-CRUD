const express = require("express");
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const formidable = require('express-formidable');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const cookieParser = require('cookie-parser');
app.use(cookieParser());
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const ObjectId = mongoose.Types.ObjectId;
const { User } = require("./models/user");
const { auth } = require('./middleware/auth');
app.use(require('./Routes/crud'))
app.use(require('./Routes/user'))

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("mongoose is ready");
})


app.use(function (req, res, next) {
    res.status(404).send('Unable to find the requested resource!');
});

const port =  process.env.PORT || 3002;
app.listen(port,()=>{{
    console.log(`Server is running at ${port}`);
}})




