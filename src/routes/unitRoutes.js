const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Unit = mongoose.model("Unit");

const router = express.Router();

router.use(requireAuth);

router.get("/units/:building", async (req, res) => {
  const units = await Unit.find({ building: req.params.building });

  res.send(units);
});

router.post("/units", async (req, res) => {
  const { name, building, hasOccupant } = req.body;

  if (!name) {
    return res.status(422).send({ error: "You must fill all forms!" });
  }

  try {
    const unit = new Unit({
      name,
      building,
      hasOccupant,
    });
    await unit.save();
    res.send(unit);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/units/:id", async (req, res) => {
  const { name, building, hasOccupant } = req.body;
  if (!name) {
    return res.status(422).send({ error: "You must fill all forms!" });
  }
  const unit = await Unit.findById(req.params.id);
  try {
    unit.name = name;
    unit.building = building;
    unit.hasOccupant = hasOccupant;
    await unit.save();
    res.send(unit);
  } catch (error) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/units/:id", async (req, res) => {
  Unit.deleteOne({ _id: req.params.id }, function (err, Unit) {
    res.send(Unit);
  });
});

module.exports = router;
