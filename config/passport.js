var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User            = require("../models").User;
var configAuth     = require('./auth');


module.exports = function(passport) {

	passport.serializeUser(function(user, done) { //How passport will store the user in the session
    		done(null, user.username);
	});

	passport.deserializeUser(function(user, done) {
        User.findOne({where: {username: user.username} } )
        .then(function(data) {
            console.log("Deserialize success!");
            done(null,user);
        })
        .catch(function(err) {
            console.log("Deserialize failure!");
            done(err,null);
        });
	});

    passport.use('local.signup', new LocalStrategy({
        usernameField : 'username',
        password: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.findOne({where:{username: username}})
        .then(function(data) {
            if (User.username) {
                return done(null, false, {message: "Username already exists"});
            }
            var newUser = {
                user_email: "example@noemail.com",
                password: password,
                user_type: "user",
                username: username
            }
            User.create(newUser)
            .then(function(data) {
                return done(null, newUser);
            })
            .catch(function(err) {
                return done(err,null);
            });
        }).catch(function(err) {
            console.log("Failed to find user or create user");
            return done(err, null);
        });
    }));
/*
    passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL

    },
    function(req, email, password, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'google.id' : profile.id }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.google.id    = profile.id;
                newUser.google.token = token;
                newUser.google.name  = profile.displayName;
                newUser.google.email = profile.emails[0].value; // pull the first email

                // save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));
*/
};

