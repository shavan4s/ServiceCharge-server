const express = require("express");
const mongoose = require("mongoose");
const requireAuth = require("../middlewares/requireAuth");

const Debit = mongoose.model("Debit");

const router = express.Router();

router.use(requireAuth);

router.get("/debits/:unit", async (req, res) => {
  const debits = await Debit.find({ unit: req.params.unit });

  res.send(debits);
});

router.post("/debits", async (req, res) => {
  const { title, timestamp, cost, unit } = req.body;

  if ((!title, !cost)) {
    return res.status(422).send({ error: "You must fill all forms!" });
  }

  try {
    const debit = new Debit({
      title,
      timestamp,
      cost,
      unit,
    });
    await debit.save();
    res.send(debit);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;
