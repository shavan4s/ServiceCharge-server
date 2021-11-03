const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  building: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Building",
  },
  name: {
    type: String,
    required: true,
  },
  hasOccupant: {
    type: Boolean,
    default: false,
  },
});

mongoose.model("Unit", unitSchema);
