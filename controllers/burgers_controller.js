var Burger = require("../models").Burger;

module.exports = function(app) {

    app.get("/", function(req, res) {
        Burger.findAll({})
            .then(function(result) {
                var dbRecordsObject = {
                    burgers: result
                };
                res.render('index', dbRecordsObject);
            });
    });

    // // POST route for saving a new post
    // app.post("/api/posts", function(req, res) {
    //     console.log(req.body);
    //     Burger.create(req.body).then(function(dbPost) {

    //         res.redirect("/");
    //     });
    // });

    app.post("/api/posts/:id", function(req, res) {
        var idData = req.params.id;
        Burger.update({
            devoured: true,
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