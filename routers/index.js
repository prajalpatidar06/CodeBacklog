const router = require("express").Router();

router.use("/users", require("./users"));
router.get("/", (req, res) => {
  res.send("ping");
});
module.exports = router;