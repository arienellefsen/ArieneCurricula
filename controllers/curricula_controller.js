var Curricula = require("../models").Curricula;

module.exports = function(app, passport) {

    app.get('/', function(req,res) {
        res.render('landingpage');
    })

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/create',
                    failureRedirect : '/'
            }
        )
    );


    app.get("/create", function(req, res) {
        //res.send('test page');
        var test = {
            name: 'Curricula'
        };
        res.render('create', test);
    });

    // POST route for saving a new post
    app.post("/api/posts", function(req, res) {
        console.log(req.body);
        Curricula.create(req.body).then(function(dbPost) {
            res.redirect("/");
        });
    });


    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.handlebars', {
            user: req.user //Get the user out of session and pass to the template
        });
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.all('*', function(req, res, next) {
        res.send("Error 404");
    });


};

function isLoggedIn(req, res, next) {

    if(req.isAuthenticated())
        return next();

    //If they aren't authenticated, return to homepage
    res.redirect('/');
};