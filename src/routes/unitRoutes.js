const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Unit = mongoose.model("Unit");
const Building = mongoose.model("Building");

const router = express.Router();

router.use(requireAuth);

router.get("/units", async (req, res) => {
  const units = await Unit.find({ building: req.building._id });

  res.send(units);
});

router.post("/units", async (req, res) => {
  const { name, debit, building } = req.body;
  const b = await Building.findById(building);

  if (!name || !debit) {
    return res.status(422).send({ error: "You must fill all forms!" });
  }

  try {
    const unit = new Unit({
      name,
      debit,
      building: b._id,
    });
    await unit.save();
    res.send(unit);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
