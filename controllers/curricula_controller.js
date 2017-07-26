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
            res.render('landingpage', { curriculaInstance: rangeToShow });
        }).catch(function(err) {
            res.send('Ooops something happened... Please come back later.')
            console.log(err);
        });
    });

    // Shows the details for a selected curricula 
    app.get("/curricula/:id", function(req, res) {
        var curricId = req.params.id;
        var compiledCurriculaObj = {};
        var userId = req.body.userId;
        var similarList = {}
        Curricula.findById(curricId).then(function(curriculaData) {
            if (curriculaData.submited_status) {
                Curricula.findAll({
                    where: {
                        submited_status: {
                            $eq: true
                        }
                    }                   
                }).then(function(allCurr){
                    CurriculaDetails.findAll({
                        where: {
                            CurriculaId: curricId
                        }
                    }).then(function(curriculaDetailsData){
                        compiledCurriculaObj.allCurricula = helpers.getRelatedByCategory(allCurr, curriculaData.category, curriculaData.id);
                        compiledCurriculaObj.curricula = curriculaData;
                        compiledCurriculaObj.curriculaDetails = curriculaDetailsData;
                        res.render('detailscurricula', compiledCurriculaObj);
                    });
                })
            } else {
                res.send("Error 404");
            }
        });
    });

     // Get route for search results
    app.get("/search", function(req, res) {
        var rawSearch = req.query.q;
        if (typeof rawSearch === 'string' && rawSearch.length >= 1) {
            var searchTerms = helpers.cleanString(rawSearch).split(" ");
            var searchResults = {};
            if (searchTerms.length > 0) {
                Curricula.findAll({
                    where: {
                        submited_status: {
                            $eq: true
                        }
                    }
                }).then(function(curricula) {
                    searchResults = helpers.search(curricula, searchTerms);
                    rangeToShow = {
                        flag: true,
                        display: helpers.limiter(searchResults, 0, 9)
                    }
                    if (Object.keys(rangeToShow.display).length === 0) {
                        rangeToShow.flag = false;
                    }
                    res.render('searchresults', { curriculaInstance: rangeToShow });

                });
            } else {
                console.log('Invalid Search Terms Were sent - no search results after cleaning.')
                res.json('Invalid Search Terms', {});
            }
        } else {
            console.log('req.query is either not a string or doesn\'t exist');
            res.json('Invalid Search Terms', {});
        }
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
            res.render('category', { curriculaInstance: rangeToShow });
        }).catch(function(err) {
            res.send('Ooops something happened... Please come back later.')
            console.log(err);
        });
    });

    // Adding a vote to a curricula and user history
    app.post('/api/vote/:id/:userid', isLoggedIn, function (req, res) {
        var curriculaId = req.params.id;
        var userId = req.session.passport.user.username;
        var voteHistory = '';

        // First Increment the vote in the curricula table
        Curricula.findById(curriculaId).then(function(curricData){
            return curricData.increment('votes', {by:1});
        }).then(function(curricData){
            // Second Get the User's vote history
            User.findById(userId).then(function(userData) {
                voteHistory = userData.votes_cast + ',' + curriculaId; //Add the curricula to the vote history
                // Third, update the vote history in the user table
                User.update({
                    votes_cast: voteHistory
                }, {
                    where: {
                        id: {
                            $eq: userId
                        }
                    }
                });
            });
            res.redirect('/curricula/' + curriculaId);
        });
    });

    // Removing a vote to a curricula and user history
    app.post('/api/unvote/:id/:userid', isLoggedIn, function (req, res) {
        var curriculaId = req.params.id;
        var userId = req.session.passport.user.id;
        var voteHistory = '';

        // First decrement the vote in the curricula table
        Curricula.findById(curriculaId).then(function(curricData){
            return curricData.increment('votes', {by:-1});
        }).then(function(curricData){
            // Second Get the User's vote history
            User.findById(userId).then(function(userData) {
                voteHistory = userData.votes_cast; // Capture vote history
                votArr = voteHistory.split(","); // Turn it into an array
                index = votArr.indexOf(curriculaId); // Find index of the vote in arr
                // If the curricula was found in vote history, remove it
                if (index > -1) {
                    votArr.splice(index,1);
                }
                
                // Turn vote history back into a comma-separated string
                voteHistory = votArr.join(',');

                // Third, update the vote history in the user table
                User.update({
                    votes_cast: voteHistory
                }, {
                    where: {
                        id: {
                            $eq: userId
                        }
                    }
                });
            });
            res.redirect('/curricula/' + curriculaId);
        });
    })

    app.get('/checkvote/:user/:curId', isLoggedIn, function(req, res){
        var userId = req.session.passport.user.id;
        var currId = req.params.curId;
        if (userId.length >= 1 && currId.length >= 1){
            User.findById(userId).then(function(userData){
                var votesArr = userData.votes_cast.split(',');
                var voted = votesArr.indexOf(currId);
                if (voted > -1) {
                    res.json({status: true})
                } else {
                    res.json({status: false})
                }
            });
        } else {
            res.json(false)
        }
    })

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/create',
            failureRedirect: '/'
        })
    );
    app.get("/create", function(req, res) {
        Curricula.findAll({})
            .then(function(result) {
                var dbCurricula = {
                    showCurricula: result
                };
                console.log(dbCurricula);
                res.render('createCurricula', dbCurricula);
                //res.send('hello');
            });
    });

    // Get route for retrieving a single post
    app.get("/create", function(req, res) {
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
                    res.render('createCurricula', compiledCurriculaObj);
                });
            });
        });
    });




    // POST route for saving a new post
    app.post("/api/posts", isLoggedIn, function(req, res) {
        console.log(req.body);
        var curricula = req.body.curricula;
        var curriculaDetails = req.body.curriculaDetails;



        if (curricula && curriculaDetails) {

            Curricula.create(curricula).then(function(dbPost) {
                //res.redirect("/");
                //res.json(dbPost);


                //curriculaDetails.CurriculaId = dbPost.id;

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


    app.post("/api/posts/:id", isLoggedIn, function(req, res) { //Vannucci: Added 'isLoggedIn'
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
        var username = req.session.passport.user.username;


        res.render('userview.handlebars', {username: username});
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/user/signup', function(req, res) {
        res.render('usersignup.handlebars');
    })

    app.post('/user/signup', passport.authenticate('local.signup', {
        successRedirect: '/userview',
        failureRedirect: '/user/signup',
        failureFlash: true
    
    }));

    app.get('/user/signin', function(req, res) {
        res.render('usersignin.handlebars');

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
