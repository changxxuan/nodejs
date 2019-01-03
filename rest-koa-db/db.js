const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/rest_koa_products';
mongoose.connect(DB_URL);

//mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.on('error', function(err){
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection open to ' + DB_URL);
});

mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
}); 

module.exports = mongoose;
