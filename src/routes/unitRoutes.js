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
  const { name, building } = req.body;

  if (!name) {
    return res.status(422).send({ error: "You must fill all forms!" });
  }

  try {
    const unit = new Unit({
      name,
      building,
    });
    await unit.save();
    res.send(unit);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
