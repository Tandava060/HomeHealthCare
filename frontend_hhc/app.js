var express = require('express');
var path = require('path');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config/config.js')
const { urlencoded } = require('body-parser');

//prod
var dotenv = require('dotenv').config();
var debug = require('debug')('my-application');

//Routes
 
var contact = require('./routes/contact');
var admin = require('./routes/admin');
 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(favicon("./public/images/favicon.ico")); 

// app.use(logger('dev')); 
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
app.use(bodyParser.text({ limit: '200mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
    secret: "bcjkebw&(82ejkf329))*(^*&^",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 3600000
    }
}));


app.use('/contact', contact);
app.use('/admin', admin);
 

// app.get('/test', function (req, res) {
//     // app.use('/blog', update_blog);
//     res.send("works");
// });


/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

//error handlers
//development error handler
//will print stacktrace
// if (app.get('env') === 'development') {
//     app.use(function(err, req, res, next) {
//         res.status(err.status || 500);
//         res.render('404', {
//             message: err.message,
//             error: err
//         });
//     });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });
// app.set('port', process.env.PORT || 3001);


module.exports = app;