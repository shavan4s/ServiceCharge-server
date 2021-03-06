require("./models/User");
require("./models/Unit");
require("./models/Building");
require("./models/Debit");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const unitRoutes = require("./routes/unitRoutes");
const debitRoutes = require("./routes/debitRoutes");
const buildingRoutes = require("./routes/buildingRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(unitRoutes);
app.use(debitRoutes);
app.use(buildingRoutes);

const mongoUri =
  "mongodb+srv://admin:1234@cluster0.wwqct.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.  Make sure you watch the video on setting up Mongo DB!`
  );
}
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your phone: ${req.user.phone}`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Listening on port 3000");
});
