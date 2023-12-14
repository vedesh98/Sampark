const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const birthdayController = require("../controllers/birthdayBhoolkus");


router.get("/",birthdayController.GET_BIRTHDAY_LIST_DAY);
router.get("/month",birthdayController.GET_BIRTHDAY_LIST_MONTH);
router.get("/range",birthdayController.GET_BIRTHDAY_RANGE);

module.exports = router;