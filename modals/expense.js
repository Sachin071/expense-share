// models/expense.js
const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  payerId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  expenseType: {
    type: String,
    required: true,
    enum: ["EQUAL", "EXACT", "PERCENT"],
  },
  participants: [
    {
      userId: { type: String, required: true },
      amountOwed: { type: Number, required: false },
      percentageShare: { type: Number, required: false },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Expense", expenseSchema);
