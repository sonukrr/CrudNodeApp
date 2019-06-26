const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crudDb', (err) => {
    if(!err)
    console.log("Successfully connected to mongo DB....");
    else
    console.log("Error while connecting to database");
})

module.exports = mongoose ;