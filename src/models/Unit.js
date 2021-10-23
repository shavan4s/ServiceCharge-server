const mongoose = require("mongoose");

const costsSchema = new mongoose.Schema({
  title: { type: String, default: "" },
  timestamp: { type: String, default: "" },
  cost: { type: Number, default: 0 },
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
  debit: [costsSchema],
});

mongoose.model("Unit", unitSchema);
