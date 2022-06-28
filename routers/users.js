const router = require("express").Router();
const userController = require("../controllers/users_controller");

router.post("/sign_up", userController.sign_up);
router.post("/sign_in", userController.sign_in);
router.get("/:id/verify/:token",userController.verifyToken)

module.exports = router;
