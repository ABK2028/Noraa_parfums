// backend/middleware/adminMiddleware.js
const db = require("../config/db");

async function adminMiddleware(req, res, next) {
  try {
    const userId = req.headers["x-user-id"];
    const providedAdminKey = req.headers["x-admin-key"];
    const requiredAdminKey = process.env.ADMIN_ACCESS_KEY;

    if (!userId) {
      return res.status(401).json({ message: "User ID header missing" });
    }

    if (requiredAdminKey && providedAdminKey !== requiredAdminKey) {
      return res.status(403).json({ message: "Invalid admin access key" });
    }

    // check user in database
    const [rows] = await db.query(
      "SELECT is_admin FROM users WHERE id = ?",
      [userId]
    );

    if (!rows.length) {
      return res.status(401).json({ message: "User not found" });
    }

    if (rows[0].is_admin !== 1) {
      return res.status(403).json({ message: "Admin access required" });
    }

    // user is admin
    next();

  } catch (err) {
    console.error("Admin middleware error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = adminMiddleware;
