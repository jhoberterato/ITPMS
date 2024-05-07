const sql = require("mssql");
require('dotenv').config()


// let config = {
//     server: process.env.server_name,
//     database: process.env.database_name,
//     user: process.env.user,
//     password: process.env.password,
//     options: {
//         cryptoCredentialsDetails: {
//             minVersion: 'TLSv1'
//         },
//         trustServerCertificate: true
//     }
// };

// let conn = new sql.ConnectionPool(config);

// conn.connect();
// let request = new sql.Request(conn);
let config = {
    "user": process.env.user,
    "password": process.env.password,
    "server": process.env.server,
    "database": process.env.database_name,
    "options": {
        "encrypt": false // Disable encryption
    }
};
sql.connect(config, (err) => {
    if(err){
        console.log(`MSSQL Connection failed: ${err}`)
    }
})
let request = new sql.Request()
module.exports = {
    request
};

