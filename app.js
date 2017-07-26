    // *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var router = express.Router();

var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var path = require('path');
var session = require('express-session'); //session middleware
var flash    = require('connect-flash');
var passport = require('passport');
var db = require("./models"); //Silly git hack
var SequelizeStore = require('connect-session-sequelize')(session.Store); //Silly git hack

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());
app.use(bodyParser());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(session({
  secret: 'curriculasecret',
  store: new SequelizeStore({
    db: db.sequelize
  }),
  resave: false,
  saveUninitialized: false
}));


//Passport
// =============================================================
app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions

app.use(function(req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.loggedInUsername = req.username;
    next();
});


 // Static directory
app.use(express.static("public"));

require('./config/passport.js')(passport); // pass passport for configuration

require('./controllers/curricula_controller.js')(app, passport); //load in our routes and pass the app and passport

// Routes
// =============================================================
require('./controllers/curricula_controller.js')(app,passport); //load in our routes and pass the app and passport
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    require('./migrations/seeds.js')(db);
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});