// backend/routes/cart.js
const express = require("express");
const db = require("../config/db"); // mysql2/promise pool

const router = express.Router();

// Table name for cart items
const TABLE_NAME = "basket_items";

/**
 * POST /api/cart
 * Body: { userId, productId, quantity }
 * - if item exists for that user+product → increase quantity
 * - else → insert new row
 */
router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res
        .status(400)
        .json({ message: "userId, productId and quantity are required" });
    }

    // 1. check if this product is already in the user's cart
    const [existingRows] = await db.query(
      `SELECT * FROM ${TABLE_NAME} WHERE user_id = ? AND product_id = ?`,
      [userId, productId]
    );

    if (existingRows.length > 0) {
      // update quantity (add to existing)
      const current = existingRows[0];
      const newQty = current.quantity + Number(quantity);

      await db.query(
        `UPDATE ${TABLE_NAME} SET quantity = ? WHERE id = ?`,
        [newQty, current.id]
      );

      return res.json({
        message: "Cart item updated",
        itemId: current.id,
        quantity: newQty,
      });
    } else {
      // insert new row
      const [result] = await db.query(
        `INSERT INTO ${TABLE_NAME} (user_id, product_id, quantity)
         VALUES (?, ?, ?)`,
        [userId, productId, quantity]
      );

      return res.status(201).json({
        message: "Item added to cart",
        itemId: result.insertId,
      });
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/cart?userId=1
 * Returns all items in user's cart with product info
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query parameter is required" });
    }

    const [rows] = await db.query(
      `SELECT b.*, p.name, p.price, p.image_url
       FROM ${TABLE_NAME} b
       JOIN products p ON b.product_id = p.id
       WHERE b.user_id = ?`,
      [userId]
    );

    res.json(rows);
  } catch (err) {
    console.error("Error getting cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/cart/:itemId
 * Removes a single cart item by its id
 */
router.delete("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;

    const [result] = await db.query(
      `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
      [itemId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Cart item removed" });
  } catch (err) {
    console.error("Error removing cart item:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/cart?userId=1
 * Clears all items in a user's cart
 */
router.delete("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId query parameter is required" });
    }

    await db.query(
      `DELETE FROM ${TABLE_NAME} WHERE user_id = ?`,
      [userId]
    );

    res.json({ message: "Cart cleared" });
  } catch (err) {
    console.error("Error clearing cart:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
