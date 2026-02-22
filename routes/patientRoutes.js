const router = require("express").Router();
const patientController = require("../controllers/patientController");

router.post("/", patientController.createPatient);
router.get("/", patientController.getAllPatients);

router.put("/update-age", patientController.updateAllAge);

router.get("/:patientId", patientController.getPatientByPatientId);
router.put("/:patientId/address-request", patientController.addressChangeRequest);

router.delete("/:patientId", patientController.deletePatient);

module.exports = router;
