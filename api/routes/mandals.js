const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Mandal = require("../models/mandal");

const checkAuth = require("../middleware/check-auth");
const MandalController = require("../controllers/mandal");
router.get("/", checkAuth, MandalController.Mandal_get_all);

router.post("/", checkAuth, MandalController.Mandal_create);

router.get("/:mandalId", checkAuth, MandalController.Mandal_get);

router.patch("/:mandalId", checkAuth, MandalController.Mandal_update);

router.delete("/:mandalId", checkAuth, MandalController.Mandal_delete);

module.exports = router;
