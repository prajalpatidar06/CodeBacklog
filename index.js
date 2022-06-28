const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const https = require("https");
const fs = require("fs");
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
const httpServer = http.createServer(app);
// const httpsServer = https.createServer(
//   {
//     key: fs.readFileSync("./https/key.pem"),
//     cert: fs.readFileSync("./https/cert.pem"),
//   },
//   app
// );

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    httpServer.listen(process.env.httpPort, () => {
      console.log("App listninig in port" + process.env.httpPort);
    });
    // httpsServer.listen(process.env.httpsPort, () => {
    //   console.log("App listning in port" + process.env.httpsPort);
    // });
  })
  .catch((e) => {
    console.log(e);
  });
