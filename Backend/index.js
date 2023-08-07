const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const qstnRoutes = require("./routes/question");
const answerRoutes = require("./routes/answer");
const notifyRoutes = require("./routes/notify");
const userRoutes = require("./routes/user");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));
//Routes
app.use("/api", authRoutes);
app.use("/api", qstnRoutes);
app.use("/api", answerRoutes);
app.use("/api", userRoutes);
app.use("/api", notifyRoutes);
//home route
app.get("/", (req, res) => {
  res.send("hello world");
});
mongoose
  .connect("mongodb://localhost/querydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const port = process.env.PORT || 3006;
app.listen(port, () => console.log(`Listening on port ${port}...`));
