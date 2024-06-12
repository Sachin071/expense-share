// routes/user.js
const express = require("express");
const User = require("../modals/user");
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
  const { userId, name, email, mobileNumber } = req.body;
  const user = new User({ userId, name, email, mobileNumber });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get user details
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
