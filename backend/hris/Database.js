
const mysql = require('mysql');
const path = require('path');


const currentDirectory = __dirname;
const directoryName = path.basename(currentDirectory);



const dbConfig = {
    connectionLimit: 10, 
    host: 'localhost',
    user: 'root',
    password: '',
    database: directoryName
};

const pool = mysql.createPool(dbConfig);


function executeQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release(); 
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    });
}


function insertQuery(sql, values = []) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
                return;
            }
            connection.query(sql, values, (error, results) => {
                connection.release(); 
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