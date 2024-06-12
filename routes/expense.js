// routes/expense.js
const express = require("express");
const router = express.Router();
const Expense = require("../modals/expense");
const Balance = require("../modals/balance");

// Add a new expense
router.post("/", async (req, res) => {
  const { payerId, totalAmount, expenseType, participants } = req.body;

  // Validate inputs based on expense type
  if (expenseType === "PERCENT") {
    const totalPercentage = participants.reduce(
      (sum, p) => sum + p.percentageShare,
      0
    );
    if (totalPercentage !== 100) {
      return res.status(400).send({ message: "Total percentage must be 100" });
    }
  } else if (expenseType === "EXACT") {
    const totalExactAmount = participants.reduce(
      (sum, p) => sum + p.amountOwed,
      0
    );
    if (totalExactAmount !== totalAmount) {
      return res
        .status(400)
        .send({ message: "Total exact amounts must equal the total amount" });
    }
  }

  const expense = new Expense({
    payerId,
    totalAmount,
    expenseType,
    participants,
  });
  try {
    await expense.save();

    // Update balances
    for (let participant of participants) {
      let amountOwed = 0;
      if (expenseType === "EQUAL") {
        amountOwed = totalAmount / participants.length;
      } else if (expenseType === "EXACT") {
        amountOwed = participant.amountOwed;
      } else if (expenseType === "PERCENT") {
        amountOwed = totalAmount * (participant.percentageShare / 100);
      }

      await Balance.updateOne(
        { userId: participant.userId, owedTo: payerId },
        { $inc: { balance: amountOwed } },
        { upsert: true }
      );
    }

    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get expenses for a user
router.get("/:userId", async (req, res) => {
  try {
    const expenses = await Expense.find({
      "participants.userId": req.params.userId,
    });
    res.send(expenses);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
