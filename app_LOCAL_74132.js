// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var router = express.Router();

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

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./controllers/burgers_controller.js")(app);
require("./controllers/curricula_controller.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});