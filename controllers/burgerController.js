// Controller for the app
var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all the routes and set up logic within those routes where required.

// GET all of the burgers
router.get("/", function(req, res) {
    burger.all((data) => {
        var allDaBurgers = {
            burgers: data
        };
        console.log(allDaBurgers);
        res.render("index", allDaBurgers);
    });
});


// Export routes for server.js to use
module.exports = router;