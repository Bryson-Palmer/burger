// Custom ORM and helper functions

// Import MySQL connnection
const connection = require("../config/connection.js");

// Helper function to dynamically add ? for queries to the database
let printQuestionMarks = (num) => {
    let arr = [];

    for (let i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
let sqlObject = (ob) => {
    let arr = [];

    // Loop through the keys and push the key/value as a string into arr
    for (let key in ob) {
        let value = ob[key];
        // Check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // IF string with spaces, add quotations (Billy Bob Thorton => "Billy Bob Thorton")
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = '"' + value + '"';
            }
            arr.push(key + "=" + value);
        }
    }

    // Translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions
const orm = {
    // SELECT all data from the table
    all: (tableInput, cb) => {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // CREATE a new row in the table
    create: (table, cols, vals, cb) => {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") "

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    // UPDATE burger by status (devoured or not)
    update: (table, burgerStatus, status, cb) => {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += sqlObject(burgerStatus);
        queryString += " WHERE ";
        queryString += status;

        console.log(queryString);
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    // DELETE burger by status
    delete: (table, status, cb) => {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += status;

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }

            cb(result);
        });
    }
};

// Export the orm object for the model (burger.js).
module.exports = orm;