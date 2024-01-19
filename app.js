const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const storyRouter = require('./routes/story');
const editRouter = require('./routes/edit');
const addNewRouter = require('./routes/addNew');

require('dotenv').config();
const config = require('./config');

const methodOverride = require('method-override');
const app = express();

app.use(methodOverride('_method'));


// Set up mongoose connection
const mongoose = require("mongoose");
const Product = require('./models/product');
mongoose.set("strictQuery", false);
const mongoDB = config.mongoDB;;

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads')); // Serve uploaded files

app.use('/', indexRouter);
app.use('/story', storyRouter);
app.use('/edit', editRouter);
app.use('/addNew', addNewRouter);

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
