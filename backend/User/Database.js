
const mysql = require('mysql');
const path = require('path');


const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);


// MySQL connection configuration
const dbConfig = {
    connectionLimit: 10, // maximum number of connections allowed
    host: 'localhost',
    user: 'root',
    password: '',
    database: directoryName
};

// Create a pool to manage connections
const pool = mysql.createPool(dbConfig);

// Function to execute queries

function executeQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release(); // release connection
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });
}

// Function to execute insert query
function insertQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release(); // release connection
                if (error) {
                    reject(error);
                } else {
                    resolve({ id: results.insertId });
                }
            });
        });
    });
}

module.exports = {
    executeQuery,
    insertQuery
};