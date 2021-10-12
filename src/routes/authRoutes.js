const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { phone, password } = req.body;
  const regex = /^(\+98|0098|98|0)?9\d{9}$/;
  if (!regex.test(phone))
    return res.status(402).send({ error: "Invalid phone" });

  try {
    const user = new User({ phone, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { phone, password } = req.body;

  if (!phone || !password) {
    return res.status(422).send({ error: "Must provide phone and password" });
  }

  const user = await User.findOne({ phone });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or phone" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or phone" });
  }
});

module.exports = router;
