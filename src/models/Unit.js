const mongoose = require("mongoose");

const costsSchema = new mongoose.Schema({
  title: String,
  timestamp: Number,
  cost: Number,
});
const unitSchema = new mongoose.Schema({
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
  },
  name: {
    type: String,
    required: true,
  },
  debit: {[costsSchema],
  default: [],}
});

mongoose.model("Unit", unitSchema);
