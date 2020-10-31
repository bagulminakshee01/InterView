const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


require('./db.js');
var listingController = require('./controllers/listingController.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin:'http://localhost:4200'})); //client side url.
//hitting url by collection name
app.use('/listings', listingController);
app.listen(3000,() => console.log('Server Started at 3000 port')); //link of server side
