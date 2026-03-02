require("dotenv").config();
const mysql = require("mysql2/promise");

const dbHost = process.env.DB_HOST || process.env.MYSQLHOST || "127.0.0.1";
const dbPort = Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306);
const dbUser = process.env.DB_USER || process.env.MYSQLUSER;
const dbPass = process.env.DB_PASS || process.env.DB_PASSWORD || process.env.MYSQLPASSWORD;
const dbName = process.env.DB_NAME || process.env.MYSQLDATABASE;
const forceSsl =
  process.env.DB_SSL === "true" ||
  process.env.MYSQL_SSL === "true" ||
  !!process.env.MYSQLHOST;

// create a pool of connections we can use with async/await
const db = mysql.createPool({
  host: dbHost,
  port: dbPort,
  user: dbUser,
  password: dbPass,
  database: dbName,
  ssl: forceSsl ? { rejectUnauthorized: false } : undefined,
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


