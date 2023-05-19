const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const sabhaController = require("../controllers/sabha");

router.get("/", checkAuth, sabhaController.sabha_get);
router.post("/", checkAuth, sabhaController.sabha_cteate);
router.get("/:sabhaId", checkAuth, sabhaController.sabha_get_single);
router.delete("/:sabhaId", checkAuth, sabhaController.sabha_delete);

module.exports = router;
