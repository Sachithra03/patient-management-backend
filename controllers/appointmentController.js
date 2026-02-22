const Appointment = require("../models/AppointmentModel");
const Patient = require("../models/PatientModel");

//check availability
async function isDoctorAvailable(doctorName, date, time) {
  const conflict = await Appointment.findOne({
    doctorName,
    date,
    time,
    status: "ACTIVE"
  });
  return !conflict;
}

// GET /appointments/check-availability?doctorName=...&date=YYYY-MM-DD&time=HH:mm
exports.checkAvailability = async (req, res) => {
  try {
    const { doctorName, date, time } = req.query;

    if (!doctorName || !date || !time) {
      return res
        .status(400)
        .json({ message: "doctorName, date, time are required" });
    }

    const available = await isDoctorAvailable(doctorName, date, time);
    res.json({ doctorName, date, time, available });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /appointments
exports.createAppointment = async (req, res) => {
  try {
    const { patientId, date, time, doctorName } = req.body;

    if (!patientId || !date || !time || !doctorName) {
      return res
        .status(400)
        .json({ message: "patientId, date, time, doctorName are required" });
    }

    // make sure patient exists
    const patient = await Patient.findOne({ patientId });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // check doctor availability
    const available = await isDoctorAvailable(doctorName, date, time);
    if (!available) {
      return res.status(409).json({ message: "Doctor not available for this slot" });
    }

    const appointment = await Appointment.create({
      patientId,
      date,
      time,
      doctorName
    });

    res.status(201).json({ message: "Appointment created", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const list = await Appointment.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /appointments/:id/cancel
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    appointment.status = "CANCELLED";
    appointment.cancelledAt = new Date();
    await appointment.save();

    res.json({ message: "Appointment cancelled", appointment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};