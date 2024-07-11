var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}
//const session = require('cookie-session');




var app = express();

app.use(express.json());
/*app.use(
  session({
      name: 'session',
      secret: 'aKey',
      expires: new Date(Date.now() + 1 * 60 * 1000),
  })
);*/


var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var databaseRouter = require('./routes/database');
var productRouter = require('./routes/products');
var searchProductsRouter = require('./routes/filteredProducts');
const { error } = require('console');





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users/login', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/database', databaseRouter);
app.use('/users/register', registerRouter);
app.use('/products',productRouter);
app.use('/products/searched',searchProductsRouter);

app.use('/static',express.static('public'));

app.get('https://localhost:9000', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})
app.post('https://localhost:9000', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
