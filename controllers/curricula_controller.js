var Curricula = require("../models").Curricula;
var CurriculaDetails = require("../models").CurriculaDetails;
var User = require('../models').User;
var helpers = require('../helpers/helpers.js');
var Sequelize = require('sequelize');

module.exports = function(app, passport, sessionMW) {

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
            User.findAll({}).then(function(userData) {
                rangeToShow = helpers.limiter(curricula, 0, 100);
                rangeToShow = helpers.matchAuthorsById(rangeToShow, userData, 'landing');
                res.render('landingpage', { curriculaInstance: rangeToShow });
            });
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
                }).then(function(allCurr) {
                    CurriculaDetails.findAll({
                        where: {
                            CurriculaId: curricId
                        }
                    }).then(function(curriculaDetailsData) {
                        User.findById(curriculaData.authorId).then(function(userData) {
                            compiledCurriculaObj.allCurricula = helpers.getRelatedByCategory(allCurr, curriculaData.category, curriculaData.id);
                            compiledCurriculaObj.curricula = curriculaData;
                            compiledCurriculaObj.author = {authName: userData.username};
                            compiledCurriculaObj.curriculaDetails = curriculaDetailsData;
                            res.render('detailscurricula', compiledCurriculaObj);
                        });
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
            var rangeToShow = {};
            var displayObj = {};
            if (searchTerms.length > 0) {
                Curricula.findAll({
                    where: {
                        submited_status: {
                            $eq: true
                        }
                    }
                }).then(function(curricula) {
                    User.findAll({}).then(function(userData){
                        searchResults = helpers.search(curricula, searchTerms);
                        rangeToShow = helpers.limiter(searchResults, 0, 9);
                        rangeToShow = helpers.matchAuthorsById(rangeToShow, userData, 'search');
                        displayObj = {
                            flag: true,
                            display: rangeToShow
                        }
                        // Determine if there were any results to display
                        if (Object.keys(displayObj.display).length === 0) {
                            displayObj.flag = false;
                        }
                        res.render('searchresults', { curriculaInstance: displayObj });
                    });
                });
            } else {
                console.log('Invalid Search Terms Were sent - no search results after cleaning.');
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
            User.findAll({}).then(function(userData) {
                rangeToShow = helpers.matchAuthorsById(helpers.limiter(curricula, 0, 9), userData, 'category');
                res.render('category', { curriculaInstance: rangeToShow });
            });
        }).catch(function(err) {
            res.send('Ooops something happened... Please come back later.')
            console.log(err);
        });
    });

    // Adding a vote to a curricula and user history
    app.post('/api/vote/:id/:userid', isLoggedIn, function(req, res) {
        var curriculaId = req.params.id;
        var userId = req.session.passport.user.id;
        var voteHistory = '';

        // First Increment the vote in the curricula table
        Curricula.findById(curriculaId).then(function(curricData) {
            return curricData.increment('votes', { by: 1 });
        }).then(function(curricData) {
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
    app.post('/api/unvote/:id/:userid', isLoggedIn, function(req, res) {
        var curriculaId = req.params.id;
        var userId = req.session.passport.user.id;
        var voteHistory = '';

        // First decrement the vote in the curricula table
        Curricula.findById(curriculaId).then(function(curricData) {
            return curricData.increment('votes', { by: -1 });
        }).then(function(curricData) {
            // Second Get the User's vote history
            User.findById(userId).then(function(userData) {
                voteHistory = userData.votes_cast; // Capture vote history
                votArr = voteHistory.split(","); // Turn it into an array
                index = votArr.indexOf(curriculaId); // Find index of the vote in arr
                // If the curricula was found in vote history, remove it
                if (index > -1) {
                    votArr.splice(index, 1);
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

    app.get('/checkvote/:user/:curId', isLoggedIn, function(req, res) {
        var userId = req.session.passport.user.id;
        var currId = req.params.curId;
        if (userId !== 'undefined' && currId !== 'undefined'){
            User.findById(userId).then(function(userData){
                var votesArr = userData.votes_cast.split(',');
                var voted = votesArr.indexOf(currId);
                if (voted > -1) {
                    res.json({ status: true })
                } else {
                    res.json({ status: false })
                }
            });
        } else {
            res.json(false)
        }
    })

    // app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // app.get('/auth/google/callback',
    //     passport.authenticate('google', {
    //         successRedirect: '/create',
    //         failureRedirect: '/'
    //     })
    // );

    // Runs when user goes to the create view
    app.get("/create", isLoggedIn, function(req, res) {
        Curricula.findAll({}).then(function(result) {
            var dbCurricula = {
                showCurricula: helpers.getUniqueCategories(result)
            };
            res.render('createCurricula', dbCurricula);
        });
    });

    // Responds to front-end API call for a JSON object 
    // of the category>subcatgory mapping
    app.get("/api/cats",  function(req, res) {
        Curricula.findAll({
            attributes: ['category', 'sub_category']
        }).then(function(curData) {
            res.json(helpers.makeCategoryObject(curData));
        });
    });

    // POST route for saving a new post
    app.post("/api/posts", isLoggedIn, function(req, res) {
        var curricula = req.body.curricula;
        var curriculaDetails = req.body.curriculaDetails;
        var username = req.session.passport.user.username;
        var userId = req.session.passport.user.id;

        if (curricula && curriculaDetails) {
            Curricula.create(curricula).then(function(dbPost) {

                Object.keys(curriculaDetails).forEach(function(item) {
                    curriculaDetails[item].CurriculaId = dbPost.id;
                    CurriculaDetails.create(curriculaDetails[item]).then(function(dbPost) {
                        res.json(true);
                    }).catch(function(err) {
                        res.json(false);
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

        var userObj = {
            username: req.session.passport.user.username,
            userId: req.session.passport.user.id
        };
        res.render('userview.handlebars', userObj);

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

    app.get('/user/logout', function(req, res, next) {
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