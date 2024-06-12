require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const balanceRoutes = require("./routes/balance");

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.DB_PATH, {}, console.log("database Connected"));

app.use("/users", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/balances", balanceRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
