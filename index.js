const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const fs = require("fs");
const config = require("./config");
const mongoose = require("mongoose");
const sendEmail = require("./utils/sendEmail");

const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: fs.readFileSync("./https/key.pem"),
    cert: fs.readFileSync("./https/cert.pem"),
  },
  app
);

mongoose
  .connect(config.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to DB");
    httpServer.listen(config.httpPort, () => {
      console.log("App listninig in port" + config.httpPort);
    });
    httpsServer.listen(config.httpsPort, () => {
      console.log("App listning in port" + config.httpsPort);
    });
  })
  .catch((e) => {
    console.log(e);
  });
