// Controller for the app
var express = require("express");
const { runInNewContext } = require("vm");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all the routes and set up logic within those routes where required.

// GET all of the burgers
router.get("/", (req, res) => {
    burger.all((data) => {
        var allDaBurgers = {
            burgers: data
        };
        console.log(allDaBurgers);
        res.render("index", allDaBurgers);
    });
});

// CREATE a new burger
router.post("/api/burgers", (req, res) => {
    burger.create([
        "burger_names", "devoured"
    ], [
        req.body.burger_names, req.body.devoured
    ], (result) => {
        res.json({ id: result.insertid });
    });
});

//  UPDATE a burger
router.put("/api/burgers/:id", (req, res) => {
    let status = "id = " + req.params.id;

    console.log("status", status);

    burger.update({
        devoured: req.body.devoured
    }, status, (result) => {
        if (result.changedRows == 0) {
            // If no row were changed, then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// DELETE a burger
router.delete("/api/burgers/:id", (req, res) => {
    let status = "id = " + req.params.id;

    burger.delete(status, (result) => {
        if (result.affectedRows == 0) {
            // If no rows were changed then the ID must not exist, so 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use
module.exports = router;