var Curricula = require("../models").Curricula;

var User = require("../models").User;

module.exports = function(app, passport) {

    app.get("/", function(req, res) {
        Curricula.findAll({}).then(function(curricula) {
            res.render('landingpage', { curriculaInstance: curricula });
        });

    });

    app.get("/create", isLoggedIn, function(req, res) {
        
        var test = {
            name: 'Curricula'
        };
        res.render('create', test);
    });

    // POST route for saving a new post
    app.post("/api/posts", isLoggedIn, function(req, res) {
        console.log(req.body);
        Curricula.create(req.body).then(function(dbPost) {
            //res.redirect("/");
            res.json(dbPost);
        });
    });

    // Get rotue for retrieving a single post
    app.get("/curricula/:id", function(req, res) {
        Curricula.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(dbPost) {
            console.log(dbPost);
            res.json(dbPost);
            //res.send('found!');
        });
    });


    app.post("/api/posts", isLoggedIn, function(req, res) {
        var idData = req.params.id;
        Curricula.update({
            status: 'update'
        }, {
            where: {
                id: {
                    $eq: idData
                }
            }
        }).then(function(data) {
            res.redirect("/");
        });
    });

    app.get('/profile/:id', isLoggedIn, function(req, res) {
        res.render('profile.handlebars', {
            user: req.user //Get the user out of session and pass to the template
        });
    });

    app.get('/userview', isLoggedIn, function(req, res) {
        //var user = passport.findAll(req.params.id);

        res.render('userview.handlebars');
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/user/signup', function(req, res) {
        var messages = req.flash('error',)
        res.render('usersignup.handlebars', {messages: messages, hasErrors: messages.len > 0});
    })

    app.post('/user/signup', passport.authenticate('local.signup', {
        successRedirect: '/user/signin',
        failureRedirect: '/user/signup',
        failureFlash: true
    
    }));

    app.get('/user/signin', function(req, res) {
        var messages = req.flash('error',)
        res.render('usersignin.handlebars', {messages: messages, hasErrors: messages.len > 0});

    });

    app.post('/user/signin', passport.authenticate('local.signin', {
        successRedirect: '/userview',
        failureRedirect: '/user/signin',
        failureFlash: true
    
    }));

    app.get('/user/logout', function(req,res, next) {
        req.logout();
        res.redirect('/');
    })


    app.all('*', function(req, res, next) {
        res.send("Error 404");
    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();

        //If they aren't authenticated, return to homepage
        res.redirect('/');
    };

};

