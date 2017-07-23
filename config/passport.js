var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User            = require("../models").User;
var configAuth     = require('./auth');


module.exports = function(passport) {

	passport.serializeUser(function(user, done) { //How passport will store the user in the session
        	done(null, user);
	});

	passport.deserializeUser(function(user, done) {
        User.findOne({where: {username: user.username} } )
        .then(function(data) {
            done(null,user);
        })
        .catch(function(err) {
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
            data = data; //This I do not understand, why do I have to initialize this??? Question for Keith
            if(!data) {
                console.log("A new record!");
            }
            console.log(data);
            if(data) {
                console.log("data username " + data.dataValues.username);
            }
            if (data && username === data.dataValues.username) { //If data exists AND the username equals what we have
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

    passport.use('local.signin', new LocalStrategy({
        usernameField : 'username',
        password: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.findOne({where:{username: username}})
        .then(function(data) {
            data = data; //This I do not understand, why do I have to initialize this??? Question for Keith
            if(!data) {
                return done(null, false, {message: "User not found"});
            }
            if (data && password !== data.dataValues.password) { //If data exists AND the password does not equal
                return done(null, false, {message: "Invalid password"});
            }
            return done(null, true, {username: data.dataValues.username, usertype: data.dataValues.user_type});

        }).catch(function(err) {
            console.log("Failed to find user or create user");
            return done(err, null);
        });

    }));

};

