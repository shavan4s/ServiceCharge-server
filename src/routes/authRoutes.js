const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { phone, password, isManager, unit, name } = req.body;
  const phoneRegex = /^(\+98|0098|98|0)?9\d{9}$/;
  if (!phoneRegex.test(phone))
    return res.status(402).send({ error: "Invalid phone" });
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!passRegex.test(password))
    return res.status(402).send({ error: "Invalid password" });

  try {
    const user = new User({ phone, password, isManager, unit, name });
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

router.get("/users/:unit", async (req, res) => {
  const user = await User.find({ unit: req.params.unit });
  res.send(user);
});
router.put("/users/:_id", async (req, res) => {
  const { phone, password } = req.body;
  const phoneRegex = /^(\+98|0098|98|0)?9\d{9}$/;
  if (!phoneRegex.test(phone))
    return res.status(402).send({ error: "Invalid phone" });
  const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!passRegex.test(password))
    return res.status(402).send({ error: "Invalid password" });
  try {
    const user = await User.findById({ _id: req.params._id });
    try {
      user.phone = phone;
      user.password = password;
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send({ error: err.message });
    }
  } catch (err) {
    return res.status(422).send(err.message);
  }
});
module.exports = router;
