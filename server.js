const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

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