var Curricula = require("../models").Curricula;
module.exports = function(app) {
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
};