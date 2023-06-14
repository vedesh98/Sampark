const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const AttendanceController = require("../controllers/attendance");

// Fecth All attendance data present in DB
router.get("/", checkAuth, AttendanceController.attendace_get_all);

// Add new attendance in DB
router.post("/", checkAuth, AttendanceController.attendace_create);

// Fetch attendance using attendance ID
router.get("/:attendanceId", checkAuth, AttendanceController.attendace_get);

// Update Attendace using attendace ID
router.patch(
  "/:attendanceId",
  checkAuth,
  AttendanceController.attendace_update
);

router.get("/sheet/:attendanceId", AttendanceController.attendace_sheet);

router.get("/followup/:attendanceId", AttendanceController.followup);

// Delete Attendace using attendance ID
router.delete(
  "/:attendanceId",
  checkAuth,
  AttendanceController.attendance_delete
);

module.exports = router;
