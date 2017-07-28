var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User            = require("../models").User;
var configAuth     = require('./auth');


module.exports = function(passport) {

	passport.serializeUser(function(user, done) { //How passport will store the user in the session
        // user = user.dataValues;

        console.log("#####NEWSERIALIZE ",user);
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
        var generateHash = function(password) {
            return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
        }

        User.findOne({where:{username: username}})
        .then(function(data) {
            data = data; //This I do not understand, why do I have to write this??? Question for Keith
            if(!data) {
                console.log("A new record!");
            }
            if(data) {
                console.log("data username " + data.dataValues.username);
            }
            if (data && username === data.dataValues.username) { //If data exists AND the username equals what we have
                return done(null, false, {message: "Username already exists"});
            }
            var hashedPassword = generateHash(password);

            var newUser = {
                user_email: "example@noemail.com",
                password: hashedPassword,
                user_type: "user",
                username: username
            }

            User.create(newUser)
            .then(function(data) {
                newUser.id = data.id;
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
        .then(function(user) {
            user = user; //This I do not understand, why do I have to initialize this??? Question for Keith
            var isValidPassword = function(userpass,password) {
                return bcrypt.compareSync(password,userpass);
            }
            if(!user) {
                return done(null, false, {message: "User not found"});
            }
            if (!isValidPassword(user.dataValues.password,password)) { //If data exists AND the password does not equal
                return done(null, false, {message: "Invalid password"});
            }
            return done(null, user);

        }).catch(function(err) {
            console.log("Failed to find user or create user");
            return done(err, null);
        });

    }));

};

