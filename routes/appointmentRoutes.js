const router = require("express").Router();
const appointmentController = require("../controllers/appointmentController");

router.get("/check-availability", appointmentController.checkAvailability);
router.post("/", appointmentController.createAppointment);
router.get("/", appointmentController.getAllAppointments);
router.put("/:id/cancel", appointmentController.cancelAppointment);

module.exports = router;