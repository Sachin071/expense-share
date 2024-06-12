// routes/balance.js
const express = require("express");
const Balance = require("../modals/balance");
const router = express.Router();

// Get balances for a user with all other users
router.get("/:userId", async (req, res) => {
  try {
    const balances = await Balance.find({
      userId: req.params.userId,
      balance: { $ne: 0 },
    });
    res.send(balances);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
