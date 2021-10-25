const mongoose = require("mongoose");

const debitSchema = new mongoose.Schema({
  unit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "unit",
  },
  title: String,
  timestamp: String,
  cost: Number,
  isPayed: { type: Boolean, default: false },
});

mongoose.model("Debit", debitSchema);
