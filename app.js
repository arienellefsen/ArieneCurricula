// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var router = express.Router();

var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// Requiring our models for syncing
//var db = require("./models/burger.js");
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(cookieParser());
app.use(bodyParser());
app.use(flash());


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Static directory
app.use(express.static("public"));

//Passport
// =============================================================
// app.use(session(sess)); 
app.use(passport.initialize());
app.use(passport.session()); //persistent login sessions
require('./config/passport.js')(passport); // pass passport for configuration

require('./controllers/curricula_controller.js')(app, passport); //load in our routes and pass the app and passport


// Routes
// =============================================================
//require("./controllers/burgers_controller.js")(app);
//require("./controllers/curricula_controller.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
    require('./migrations/seeds.js')(db);
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});