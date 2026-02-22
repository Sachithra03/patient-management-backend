const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const patientRoutes = require("./routes/patientRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("➡️", req.method, req.originalUrl);
  next();
});


app.use("/patients", patientRoutes);


const PORT = process.env.PORT || 5001;

mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB.');
})
.catch((error) => {
    console.error('MongoDb connection Failed:', error);
});

app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});