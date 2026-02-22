const mongoose = require("mongoose");

const AddressChangeRequestSchema = new mongoose.Schema({
    oldAddress: {
        type: String,
        required: true
    },
    newAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    requestedAt: {
        type: Date,
        default: Date.now
    }
},
    { _id: false }
);

const PatientSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    nic: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    age: { 
        type: Number, 
        required: true 
    },
    address: {
        type: String,
        required: true
    },
    previousCaseHistory: {
        type: String,
        default: ""
    },
    addressChangeRequests: {
        type: [AddressChangeRequestSchema],
        default: []
    }
},
    { timestamps: true }
);

module.exports = mongoose.model("Patient", PatientSchema);