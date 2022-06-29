const router = require("express").Router();

router.use("/users", require("./users"));
router.use("/problems", require("./problems"));
router.get("/", (req, res) => {
  res.sendFile("home.html", { root: __dirname });
});
module.exports = router;
