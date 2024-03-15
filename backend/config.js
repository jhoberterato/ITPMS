const sql = require("mssql");

let config = {
    server: 'NMCPHISRV_E6',
    database: 'ITMS',
    user: 'sa',
    password: '@ccp@c53rv3r',
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

