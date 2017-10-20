// require
var express = require('express');
var path = require('path');
var fileUpload = require('express-fileupload');
var app = express();
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

var adminHome = require('./controllers/admin/adminHome');
var adminCategory = require('./controllers/admin/adminCategory');
var adminProduct = require('./controllers/admin/adminProduct');
var registered = require('./controllers/registeredUser');
var customer= require('./controllers/customerControllers/customer');
var adminOrder = require('./controllers/admin/adminOrder');


var port = process.env.PORT || 7561;

//configure
app.set('view engine','ejs');

// middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));
app.use(expressValidator());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "node_modules/jquery/dist")));

//route
app.get('/',function(req,res){

	res.redirect('/customer');
});


app.use(adminHome);
app.use(adminCategory);
app.use(adminProduct);
app.use(registered);
app.use(customer);
app.use(adminOrder);

//server
app.listen(port,function(){

	console.log('Server started at ' + port + ' port....');

});