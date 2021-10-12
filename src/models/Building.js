const mongoose = require("mongoose");

const buildingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  shebaNumber: {
    type: Number,
    required: true,
  },
  shebaOwner: {
    type: String,
    required: true,
  },
});

mongoose.model("Building", buildingSchema);
