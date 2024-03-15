const sql = require("mssql");


let config = {
    server: process.env.server_name,
    database: process.env.database_name,
    user: process.env.user,
    password: process.env.password,
    options: {
        cryptoCredentialsDetails: {
            minVersion: 'TLSv1'
        },
        trustServerCertificate: true
    }
};

let conn = new sql.ConnectionPool(config);

conn.connect();
let request = new sql.Request(conn);

module.exports = {
    request
};

