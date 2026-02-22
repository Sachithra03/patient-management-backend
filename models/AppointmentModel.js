const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: { type: String, required: true }, 
    date: { type: String, required: true },   
    time: { type: String, required: true },      
    doctorName: { type: String, required: true },
    status: {
      type: String,
      enum: ["ACTIVE", "CANCELLED"],
      default: "ACTIVE"
    },
    cancelledAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", AppointmentSchema);