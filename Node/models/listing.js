const mongoose = require('mongoose');

//All schemas in collection w.r.t type
var Listing = mongoose.model('listings',{
    
    name: { type: String},
    last: { type: String},
    email: { type: String},
    number: { type: Number},
    image_path: {type: String }
});

module.exports = {Listing} ;