const router = require("express").Router();
const userController = require("../controllers/users_controller");
const { auth } = require("../utils/auth");

router.post("/sign_up", userController.sign_up);
router.post("/sign_in", userController.sign_in);
router.get("/:id/verify/:token", userController.verifyToken);
router.get("/me", auth, userController.getAuther);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);

module.exports = router;
