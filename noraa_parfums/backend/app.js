require("dotenv").config();
const express = require("express");
const cors = require("cors");
const adminRoutes = require("./routes/admin");

const app = express();

// === MIDDLEWARE ===
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://noraa-parfums.netlify.app"
  ],
  credentials: true
}));

app.use(express.json()); // middleware to parse JSON request bodies

// === ROUTE IMPORTS ===
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");
const feedbackRoutes = require("./routes/feedback");
const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/users");
const reviewRoutes = require("./routes/reviews");
const chatbotRoutes = require("./routes/chatbot");

// === BASIC ROUTES ===
app.get("/", (req, res) => {
  res.send("Backend is working - Summer");
});

app.get("/api", (req, res) => {
  res.json({
    message: "API Backend is working - Summer",
    endpoints: [
      "GET /api/products",
      "GET /api/products/:id",
      "POST /api/cart",
      "GET /api/orders",
      "POST /api/feedback",
      "POST /api/contact",
      "POST /api/users/register",
      "POST /api/users/login",
      "POST /api/chatbot",
      "GET /api/reviews/:productId",
      "POST /api/reviews/:productId",
      "DELETE /api/reviews/:reviewId"
    ]
  });
});

// === API ROUTES ===
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/admin", adminRoutes); // ✅ Added admin routes

// === 404 HANDLER ===
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    requested: `${req.method} ${req.originalUrl}`
  });
});

// === START SERVER ===
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
