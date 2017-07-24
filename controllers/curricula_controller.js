var Curricula = require("../models").Curricula;
var CurriculaDetails = require("../models").CurriculaDetails;
var User = require('../models').User;
var helpers = require('../helpers/helpers.js');
var Sequelize = require('sequelize');

module.exports = function(app, passport) {

    // Get the landing page content
    app.get("/", function(req, res) {
        var rangeToShow;
        Curricula.findAll({
            where: {
                submited_status: {
                    $eq: true
                }
            }
        }).then(function(curricula) {
            rangeToShow = helpers.limiter(curricula, 0, 9);
            console.log(rangeToShow);
            res.render('landingpage', { curriculaInstance: rangeToShow });
        }).catch(function(err) {
            res.send('Ooops something happened... Please come back later.')
            console.log(err);
        });
    });

    // Get route for retrieving a single post
    app.get("/curricula/:id", function(req, res) {
        var curricId = req.params.id;
        var compiledCurriculaObj = {};
        var similarList = {}

        CurriculaDetails.findAll({
            where: {
                CurriculaId: curricId
            }
        }).then(function(curriculaDetailsData) {
            Curricula.findById(curricId).then(function(curriculaData) {
                Curricula.findAll({
                    where: {
                        submited_status: {
                            $eq: true
                        }
                    }
                }).then(function(allCurr) {
                    compiledCurriculaObj.allCurricula = helpers.getRelatedByCategory(allCurr, curriculaData.category, curriculaData.id);
                    compiledCurriculaObj.curricula = curriculaData;
                    compiledCurriculaObj.curriculaDetails = curriculaDetailsData;
                    res.render('detailscurricula', compiledCurriculaObj);
                });
            });
        });
    });

    // Get route to display posts in category
    app.get("/category/:cat", function(req, res) {
        var curCat = req.params.cat;
        var rangeToShow;
        var catObj = {
            where: {
                category: {
                    $eq: curCat
                }
            }
        };

        if (curCat.slice(0, 3) === 'su_') {
            catObj.where = {
                sub_category: {
                    $eq: curCat.slice(3)
                }
            }

        }

        Curricula.findAll(catObj).then(function(curricula) {
            rangeToShow = helpers.limiter(curricula, 0, 9);
            console.log(rangeToShow);
            res.render('category', { curriculaInstance: rangeToShow });
        }).catch(function(err) {
            res.send('Ooops something happened... Please come back later.')
            console.log(err);
        });
    });

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/create',
            failureRedirect: '/'
        })
    );

    // //Create Curricula using form
    // app.get("/create", function(req, res) {
    //     Curricula.findAll({})
    //         .then(function(result) {
    //             var showCurricula = {
    //                 curricula: result
    //             };
    //         });
    //     res.render('create', showCurricula);
    // });


    app.get("/create", function(req, res) {
        Curricula.findAll({})
            .then(function(result) {
                var dbCurricula = {
                    showCurricula: result
                };
                res.render('create', dbCurricula);
                //res.send('hello');
            });
    });


    // POST route for saving a new post
    app.post("/api/posts", function(req, res) {
        console.log(req.body);
        var curricula = req.body.curricula;
        var curriculaDetails = req.body.curriculaDetails;

        if (curricula && curriculaDetails) {

            Curricula.create(curricula).then(function(dbPost) {
                console.log(curriculaDetails);
                Object.keys(curriculaDetails).forEach(function(item) {
                    curriculaDetails[item].CurriculaId = dbPost.id;
                    CurriculaDetails.create(curriculaDetails[item]).then(function(dbPost) {
                        //res.redirect("/");
                        console.log(dbPost);
                    }).catch(function(err) {
                        // print the error details
                        console.log(err);
                    });
                });
            });
        }
    });


    app.post("/api/posts/:id", function(req, res) {
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

    if (req.isAuthenticated())
        return next();

    //If they aren't authenticated, return to homepage
    res.redirect('/');
};