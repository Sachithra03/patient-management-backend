# 🏥 Patient Management System - Backend

A complete backend implementation of a **Patient Management System** built with Node.js, Express.js, MongoDB Atlas, and Mongoose following **MVC Architecture**.

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB Atlas | Cloud database |
| Mongoose | ODM for MongoDB |
| dotenv | Environment variables |
| nodemon | Dev auto-restart |

---

## 🏗️ Project Structure (MVC Architecture)

```
patient-management-backend/
│
├── controllers/
│   ├── patientController.js
│   └── appointmentController.js
│
├── models/
│   ├── PatientModel.js
│   └── AppointmentModel.js
│
├── routes/
│   ├── patientRoutes.js
│   └── appointmentRoutes.js
│
├── utils/
│   └── age.js
│
├── server.js
├── package.json
└── .env           ← not uploaded to GitHub
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Sachithra03/patient-management-backend.git
cd patient-management-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env` file in the root folder:

```env
PORT=5001
MONGO_URI=your_mongodb_atlas_connection_string
```

### 4. Run the Server

```bash
npm run dev
```

Server runs on: `http://localhost:5001`

---

## 📡 API Endpoints

### 🧑‍⚕️ Patient Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/patients` | Create a new patient |
| GET | `/patients` | Get all patients |
| GET | `/patients/:patientId` | Get patient by ID |
| PUT | `/patients/update-age` | Recalculate age for all patients |
| PUT | `/patients/:patientId/address-request` | Request address change |
| DELETE | `/patients/:patientId` | Delete a patient |

#### ➤ Create Patient — Request Body
```json
{
  "patientId": "P001",
  "name": "Kamal Perera",
  "nic": "200012345678",
  "dob": "2000-05-10",
  "address": "Colombo 10",
  "previousCaseHistory": "Diabetes"
}
```

#### ➤ Address Change Request — Request Body
```json
{
  "newAddress": "Kandy"
}
```

---

### 🗓️ Appointment Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/appointments/check-availability` | Check doctor availability |
| POST | `/appointments` | Create a new appointment |
| GET | `/appointments` | Get all appointments |
| PUT | `/appointments/:id/cancel` | Cancel an appointment |

#### ➤ Check Availability — Query Params
```
GET /appointments/check-availability?doctorName=Dr.Silva&date=2026-02-25&time=10:30
```

#### ➤ Create Appointment — Request Body
```json
{
  "patientId": "P001",
  "date": "2026-02-25",
  "time": "10:30",
  "doctorName": "Dr.Silva"
}
```

---

## 🧠 Key Functionalities

- ✅ Age calculated automatically from DOB
- ✅ Doctor availability check prevents double booking
- ✅ Address change requests tracked with history and status
- ✅ Appointment cancellation reopens the slot
- ✅ MVC architecture implemented
- ✅ MongoDB Atlas used for cloud data storage

---

## 🧪 API Testing

All APIs were tested and validated using **Postman**.  
Screenshots of responses are included in the submission document.

---

## 🔗 Git Workflow

- Feature branches used for each module
- Pull requests merged into `main`
- Structured and descriptive commit messages used

---

## 👨‍💻 Developed By

**Sachithra**