var Curricula = require("../models").Curricula;
var path = require("path");

module.exports = function(app) {
    //Home page route
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    //Create curricula form
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
            //res.redirect("/");
            res.json(dbPost);
        });
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



};