var db = require("../models").Curricula;
module.exports = function(app) {
    app.get("/test", function(req, res) {
        res.send('test page');
    });
};