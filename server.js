
const { ConnectivitySocks } = require('./util/sock-util');
const socket = new ConnectivitySocks().getSocket();
const {
    Client
} = require("pg");

const dbConfig = {
    user: "billing_admin",
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,//aws-rds-dev
    database: "billing_engine",
    port: process.env.PG_PORT,//5432
    stream: socket
}
const client = new Client(dbConfig);
  client.connect((err) => {
    if (err) {
        console.log("Error Occured while connection-", err.message);
    }
    else {
        client.query('SELECT NOW()', (err, res) => {
            if (err) {
                console.error('Error executing query:', err.stack);
                return;
            }
            console.log('Query result:', res.rows[0]);
            client.end(); // Close PostgreSQL connection
        });
    }
})
