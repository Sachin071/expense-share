// models/balance.js
const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  owedTo: { type: String, required: true },
  balance: { type: Number, required: true },
});

balanceSchema.index({ userId: 1, owedTo: 1 }, { unique: true });

module.exports = mongoose.model("Balance", balanceSchema);
