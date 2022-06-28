const router = require("express").Router();
const { auth } = require("../utils/auth");
const problemsController = require("../controllers/problems_controller");

router.post("/", auth, problemsController.createProblem);
router.get("/", problemsController.getAllProblems);

module.exports = router;
