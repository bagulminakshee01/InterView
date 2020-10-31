const mongoose = require('mongoose');


//database name.
mongoose.connect('mongodb://localhost:27017/CurdDb',{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
},(err) => {
    if (!err)
    console.log('Connected...');
    else
    console.log('Error in db:'+ JSON.stringify(err,undefined,2));
} );
mongoose.connect('mongodb:localhost:mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false27017/?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false, { useFindAndModify: false }');
// // Connecting to the database
// mongoose.connect('mongodb://localhost:27017/CurdDb', {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(() => {
//     console.log("Successfully connected to the database");    
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });
module.exports = mongoose;