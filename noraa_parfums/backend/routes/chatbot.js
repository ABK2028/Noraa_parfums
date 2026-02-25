const express = require("express");
const router = express.Router();

// Noraa fragrance assistant responses
const getReply = (message) => {
  const m = (message || "").toLowerCase().trim();

  if (m.includes("hello") || m.includes("hi") || m.includes("hey")) {
    return "Hi! I’m Noraa’s fragrance assistant. Tell me the scent style you like (fresh, floral, woody, or spicy) and I’ll suggest the best match.";
  }

  if (m.includes("fresh") || m.includes("citrus")) {
    return "For a fresh and uplifting profile, try Bleu de Chanel. It opens with citrus and aromatic notes and works well for everyday wear.";
  }

  if (m.includes("floral") || m.includes("romance")) {
    return "For a floral style, Versace Crystal Noir is a beautiful choice with elegant heart notes and a smooth warm base.";
  }

  if (m.includes("woody") || m.includes("warm") || m.includes("spicy") || m.includes("oriental")) {
    return "If you want warm, woody depth, Dior Sauvage Elixir is a strong option with spicy opening notes and rich base accords.";
  }

  if (m.includes("sweet") || m.includes("vanilla") || m.includes("gourmand")) {
    return "For something sweet and addictive, Black Opium Over Red is a great pick with a rich gourmand feel.";
  }

  if (m.includes("travel") || m.includes("small") || m.includes("sample")) {
    return "Our Travel Size Discovery options are ideal if you want portability or to try scents before committing to larger sizes.";
  }

  if (m.includes("contact") || m.includes("buy") || m.includes("purchase")) {
    return "You can use the Contact page for purchase requests. If you want, tell me your preferred scent profile and I can suggest the best option first.";
  }

  if (m.includes("thanks") || m.includes("thank you")) {
    return "You’re welcome. I can also suggest one fragrance for day wear and one for evening if that helps.";
  }

  return "Tell me your preferred scent family and occasion, and I’ll recommend a fragrance for you. Example: fresh for office, floral for date night, or warm woody for evening.";
};

router.post("/", (req, res) => {
  try {
    const { message } = req.body || {};
    const response = getReply(message);
    res.json({ response });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ response: "Something went wrong. Please try again or contact support." });
  }
});

module.exports = router;
