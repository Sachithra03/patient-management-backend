const Patient = require('../models/PatientModel');
const { calculateAge } = require('../utils/age');

//Create patient

exports.createPatient = async (req, res) => {
    try{
        const {patientId, name, nic, dob, address, previousCaseHistory} = req.body;

        if(!patientId || !name || !nic || !dob || !address){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const patient = new Patient({
            patientId,
            name,
            nic,
            dob,
            age: calculateAge(dob),
            address,
            previousCaseHistory: previousCaseHistory || ""
        });

        await patient.save();

        res.status(201).json({message: 'Patient created successfully', patient});

    }catch(error){
        res.status(500).json({ message: 'Failed to create patient', error: error.message });
    }
};

//Get all patients

exports.getAllPatients = async (req, res) => {
    try{
        const patients = await Patient.find().sort({createdAt: -1});
        res.status(200).json(patients);
    }catch(error){
        res.status(500).json({ message: 'Failed to fetch patients', error: error.message });
    }
}

//Get patient by ID

exports.getPatientByPatientId = async (req, res) => {
   try{
    const patient = await Patient.findOne({ patientId: req.params.patientId});

    if( !patient){
        return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);

   }catch(error){
        res.status(500).json({ message: 'Failed to fetch patient', error: error.message });
   }
}

exports.updateAllAge = async (req, res) => {
    const patients = await Patient.find();

    for(const p of patients){
        p.age = calculateAge(p.dob);
        await p.save();
    }

    res.status(200).json({ message: "Ages updated", total: patients.length });
};

exports.addressChangeRequest = async (req, res) => {
    const { newAddress } = req.body;

    if( !newAddress){
        return res.status(400).json({ message: 'New address is required' });
    }
    const patient = await Patient.findOne({ patientId: req.params.patientId });

    if( !patient){
        return res.status(404).json({ message: 'Patient not found' });
    }

    const request = {
        oldAddress: patient.address,
        newAddress,
        status: 'pending',
        requestedAt: new Date()
    };

    patient.address = newAddress;
    patient.addressChangeRequests.push(request);

    await patient.save();

    res.status(200).json({ message: 'Address updated', request, patient });
};

exports.deletePatient = async (req, res) => {
    try{
        const patient = await Patient.findOneAndDelete({ patientId: req.params.patientId });

        if( !patient){
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    }catch(error){
        res.status(500).json({ message: 'Failed to delete patient', error: error.message });
    }
};

exports.deletePatient = async (req, res) => {
  try {
    const deleted = await Patient.findOneAndDelete({ patientId: req.params.patientId });

    if (!deleted) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json({ message: "Patient deleted successfully", deletedPatient: deleted });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};