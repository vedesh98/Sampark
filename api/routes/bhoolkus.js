const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const BhoolkusController = require("../controllers/bhoolku");

router.get("/", checkAuth, BhoolkusController.bhoolku_get_all);

router.post("/", checkAuth, BhoolkusController.bhoolku_create);

router.post("/mass", checkAuth, BhoolkusController.bhoolku_create_mass);

router.get("/:bhoolkuId", checkAuth, BhoolkusController.bhoolku_get_bhoolku);

router.patch("/:bhoolkuId", checkAuth, BhoolkusController.bhoolku_update);

router.delete("/:bhoolkuId", checkAuth, BhoolkusController.bhoolku_delete);

module.exports = router;
