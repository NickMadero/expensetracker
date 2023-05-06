const mysql = require('mysql2');

console.error("USING DEV SETTINGS TO CONNECT TO DB");
connection = mysql.createPool({
    connectionLimit	: 10,
    host            : 'localhost',
    user            : 'root',
    password        : 'root',
    database        : 'practicedb',
    port			: '3001',
});




connection.getConnection(function(err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database with ID ' + "youre connected");
});


module.exports = connection;