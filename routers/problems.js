const router = require("express").Router();
const { auth } = require("../utils/auth");
const problemsController = require("../controllers/problems_controller");

router.get("/", problemsController.getAllProblems);
router.get("/me", auth, problemsController.getAutherProblems);
router.get("/:id", problemsController.getProblemById);
router.post("/", auth, problemsController.createProblem);
router.put("/:id", auth, problemsController.updateProblem);
router.delete("/:id", auth, problemsController.deleteProblem);

module.exports = router;
