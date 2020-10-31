const express = require('express');
const router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Listing } = require('../models/listing');

// => localhost:3000/listings/
router.get('/', (req, res) => {
    Listing.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else { console.log('Error in Retriving List:' + JSON.stringify(err, undefined,2));}
    });
});
const UPLOAD = require('../img-upload')
// post method (for storing all form data into db)
router.post('/',UPLOAD.single('file'),(req, res) => {
    console.log(req.file.filename)
    var lis = new Listing({
        name: req.body.name,
        last: req.body.last,
        email: req.body.email,
        number: req.body.number,
        image_path: req.file.filename
    });
    lis.save((err, doc) => {
        if (!err) {res.send(doc);}
        else {console.log('Error in listing save:' + JSON.stringify(err, undefined, 2));}
    });
});

// to get data from db using perticular _id
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send('No record with given id : ${req.params.id}');

      Listing.findById(req.params.id, (err, doc) => {
          if(!err) {res.send(doc);}
          else {console.log('Error in retriving data:' +JSON.stringify(err,undefined,2)); }
      });
});

//put method to update a records
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send('No record with given id : ${req.params.id}');

      var lis = {
        name: req.body.name,
        last: req.body.last,
        email: req.body.email,
        number: req.body.number
      };
      Listing.findByIdAndUpdate(req.params.id, {$set:lis},{$new:true},(err,doc) =>{
          if (!err){res.send(doc);}
          else{ console.log('Error in listing update :' + JSON.stringify(err,undefined,2)); }
      });
});

// delete perticular id.
router.delete('/:id',(req, res) =>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

    Listing.findByIdAndDelete(req.params.id, (err, doc)=> {
        if (!err){res.send(doc);}
        else{ console.log('Error in listing Delete :' + JSON.stringify(err,undefined,2)); }
    });
});

module.exports = router;