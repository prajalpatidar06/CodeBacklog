const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(cors());
app.use("/", require("./routers"));
const Server = http.createServer(app);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    Server.listen(process.env.PORT || 3000, () => {
      console.log("App listninig in port " + (process.env.PORT || 3000));
    });
  })
  .catch((e) => {
    console.log(e);
  });
