// backend/routes/products.js
const express = require("express");
const db = require("../config/db"); // mysql2/promise pool

const router = express.Router();

/**
 * GET /api/products
 * Optional query: ?category=Mens
 */
router.get("/", async (req, res) => {
  const category = req.query.category;

  try {
    let sql = `
      SELECT p.id, p.name, p.description, p.price, p.stock,
             p.image_url, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
    `;
    const params = [];

    if (category) {
      sql += " WHERE c.name = ?";
      params.push(category);
    }

    sql += " ORDER BY p.id ASC";

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("PRODUCTS DB error:", err.code || err.message);
    res.status(500).json({ message: "Failed to load products." });
  }
});

/**
 * GET /api/products/:id
 */
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: "Invalid product id" });
  }

  try {
    const sql = `
      SELECT p.id, p.name, p.description, p.price, p.stock,
             p.image_url, c.name AS category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;
    const [rows] = await db.query(sql, [id]);

    if (!rows.length) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("SINGLE PRODUCT DB error:", err.code || err.message);
    res.status(500).json({ message: "Failed to load product." });
  }
});

module.exports = router;
