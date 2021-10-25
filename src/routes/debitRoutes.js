const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Unit = mongoose.model("Debit");
const Unit = mongoose.model("Unit");

const router = express.Router();

router.use(requireAuth);

router.get("/debits", async (req, res) => {
  const debits = await Debit.find({ debits: req.debits._id });

  res.send(debits);
});

router.post("/units", async (req, res) => {
  const { name, unit } = req.body;
  const b = await Unit.findById(unit);

  if (!name) {
    return res.status(422).send({ error: "You must fill all forms!" });
  }

  try {
    const debit = new Unit({
      name,
      debit,
      unit: u._id,
    });
    await unit.save();
    res.send(debit);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
