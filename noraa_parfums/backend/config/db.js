require("dotenv").config();
const mysql = require("mysql2/promise");

const dbHost = process.env.DB_HOST || "127.0.0.1";
const dbPort = Number(process.env.DB_PORT || 3306);
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS || process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// create a pool of connections we can use with async/await
const db = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: dbName,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_POOL_SIZE || 10),
  queueLimit: 0,
});

// optional: quick test on startup
db.getConnection()
  .then(conn => {
    console.log("✅ Connected to MySQL!");
    conn.release();
  })
  .catch(err => {
    console.error("⚠️  DB connection error:", err.code || err.message);
    console.log("⚠️  Server will run but database features won't work.");
    console.log("⚠️  To fix: Set up MySQL and configure .env file");
  });

module.exports = db;


