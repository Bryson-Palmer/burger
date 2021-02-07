// Import the ORM to create functions that will interact with the database
const orm = require("../config/orm.js");

const burger = {
    all: (cb) => {
        orm.all("burgers", (res) => {
            cb(res);
        });
    },
    // Variables cols and vals are arrays
    create: (cols, vals, cb) => {
        orm.create("burgers", cols, vals, (res) => {
            cb(res);
        });
    },
    update: (burgerStatus, status, cb) => {
        orm.update("burgers", burgerStatus, status, (res) => {
            cb(res);
        });
    },
    delete: (status, cb) => {
        orm.delete("burgers", status, (res) => {
            cb(res);
        });
    }
};

// Export the database functions for the controller (burgerController.js)
module.exports = burger;