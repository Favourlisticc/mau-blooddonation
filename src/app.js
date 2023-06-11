const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport')
const session = require('express-session')
const mongoStore = require('connect-mongo')
const mongoose = require('mongoose');
const flash = require('connect-flash');
const mime = require('mime');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');

//calling env file
const { PORT, SESSION_SECRET, MONGO_URI } = require('./config/env')

//Calling the database
require('./mongoconnection/mongodb')

const app = express()

//importing routes
const index = require('./routes/index')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Static folder
app.use(express.static(path.join(__dirname, 'public')))


//method overiding
app.use(methodOverride('_method'));

// app.use(methodOverride(function (req, res) {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     var method = req.body._method
//     delete req.body._method
//     return method
//   }
// }))

// set up session cookies
app.use(session(
{
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store : mongoStore.create({
    mongoUrl: MONGO_URI
  })
}
))

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//Static folder
app.use(express.static(path.join(__dirname, 'public')))

app.get('*.js', (req, res, next) => {
  res.type('application/javascript');
  next();
});

//logging
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

//join views path for hbs
const viewspath = path.join(__dirname, './view')
console.log(viewspath)

//handlebars for views
app.engine('hbs',exphbs.engine({defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set('views', viewspath)


// //method overiding
// app.use(methodOverride(function (req, res) {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     var method = req.body._method
//     delete req.body._method
//     return method
//   }
// }))

//calling routes so we can use it
app.use('/', index)

//PORT
const Port = PORT;

//app starting listen
app.listen(Port, console.log(`Server running in ${process.env.NODE_ENV} model on ${Port}`))