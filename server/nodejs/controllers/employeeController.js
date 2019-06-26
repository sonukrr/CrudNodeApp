const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Employee } = require('../models/employee');

//localhost:3000/employees/
router.get('/', (req , res) => {
    Employee.find((err, docs) => {
        if(!err) { res.send(docs); }
        else { console.log('Error in retrieving Employees: '+ JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req , res) => {
    var emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    });
    emp.save((err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log("Error in Employee save: "+JSON.stringify(err, undefined, 2));}
    });
});

router.get('/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("No record with given ID exist in DB");
    Employee.findById(req.params.id,(err, doc) => {
        if(!err){ return doc}
        else { console.log("Error in fetching employee data:"+JSON.stringify(err,undefined,2));}
    });
});

router.put('/',(req, res) => {
    if(!ObjectId.isValid(req.body._id))
    return res.status(400).send("No record with given id exists in DB");
    else 
    var emp = {
        name: req.body.name,
        position: req.body.position,
        office: req.body.office,
        salary: req.body.salary,
    }

    Employee.findByIdAndUpdate(req.body._id, { $set: emp }, {new: true}, (err, doc) => {
        if(!err) { res.send(doc); }
        else { console.log("Error in Employee update :"+ JSON.stringify(err, undefined, 2));}
    });
});

router.delete('/:id',(req, res) => {
    if(!ObjectId.isValid(req.params.id)) { return res.status(201).send("The following ID does not exist in DB");}
    else 
    Employee.findByIdAndRemove( req.params.id, (err, doc) => {
        if(!err) { res.send(doc);}
        else { console.log("Error in deleteing the employee: "+JSON.stringify(err, undefined, 2)); }
    } );

})
module.exports = router;