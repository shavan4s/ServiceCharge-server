const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Building = mongoose.model("Building");

const router = express.Router();

router.use(requireAuth);

router.get("/buildings", async (req, res) => {
  const buildings = await Building.find({ userId: req.user._id });
  // const buildings = await Building.find({ user: req.user._id }).populate(
  //   "User"
  // );
  res.send(buildings);
});

router.post("/buildings", async (req, res) => {
  const { name, shebaNumber, shebaOwner } = req.body;

  if (!name || !shebaNumber || !shebaOwner) {
    return res.status(422).send({ error: "You must fill all forms!" });
  }
  try {
    const building = new Building({
      name,
      shebaNumber,
      shebaOwner,
      userId: req.user._id,
    });
    await building.save();
    res.send(building);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.put("/buildings/:id", async (req, res) => {
  const { name, shebaNumber, shebaOwner } = req.body;
  if (!name || !shebaNumber || !shebaOwner) {
    return res.status(422).send({ error: "You must fill all forms!" });
  }
  const building = await Building.findById(req.params.id);
  try {
    building.name = name;
    building.shebaNumber = shebaNumber;
    building.shebaOwner = shebaOwner;
    await building.save();
    res.send(building);
  } catch (error) {
    res.status(422).send({ error: err.message });
  }
});

router.delete("/buildings/:id", async (req, res) => {
  Building.deleteOne({ _id: req.params.id }, function (err, Building) {
    res.send(Building);
  });
});

module.exports = router;
