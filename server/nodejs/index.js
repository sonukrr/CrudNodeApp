const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController')
var cors = require('cors');

var app = express();

app.use(cors()); 
app.use(bodyParser.json());

app.listen(3000, () => console.log("Express Server started at port: 3000"));

app.use('/employees',employeeController);