# Healthcare Management System

This is a comprehensive healthcare management system that includes an admin panel, frontend user interface, and backend server. The project is structured into three main directories: **admin**, **frontend**, and **backend**.

## Prerequisites

- **Node.js** (version 20 or later)
- **Docker** (for running with Docker)

---
## Set envs

### **1. Admin `.env` File**

```env
# Admin Section
VITE_BACKEND_URL='http://localhost:4000'
VITE_CURRENCY="₹"
```

### **2. Frontend `.env` File**

```env
# Frontend Section
VITE_BACKEND_URL='http://localhost:4000'
VITE_RAZORPAY_KEY_ID="rzp_live_dummykeyid"
```

### **3. Backend `.env` File**

```env
# Backend Section
MONGODB_URI='mongodb+srv://username:password@cluster0.dummy.mongodb.net'
CLOUDINARY_NAME='dummycloudname'
CLOUDINARY_API_KEY='dummyapikey123456'
CLOUDINARY_SECRET_KEY='dummysecretkey987654'
ADMIN_EMAIL='admin@dummyemail.com'
ADMIN_PASSWORD='dummyadminpassword'
JWT_SECRET='dummyjwtsecretkey'
RAZORPAY_KEY_ID='rzp_live_dummyrzpkeyid'
RAZORPAY_KEY_SECRET='dummyrazorpaysecretkey'
CURRENCY='INR'
STRIPE_SECRET_KEY='sk_test_dummystripekey'
```

---

## Running the Project Normally

### 1. Install Dependencies

Navigate to each directory (`admin`, `frontend`, `backend`) and install the dependencies:

```bash
cd admin
npm install

cd ../frontend
npm install

cd ../backend
npm install
```

### 2. Start the Development Servers

In separate terminal windows, start the development servers for each part of the project:

- **Start the Frontend**:
  ```bash
  cd frontend
  npm run dev
  ```

- **Start the Admin Panel**:
  ```bash
  cd ../admin
  npm run dev -- --port 5174
  ```

- **Start the Backend Server**:
  ```bash
  cd ../backend
  npm run start
  ```

### 3. Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Admin Panel**: [http://localhost:5174](http://localhost:5174)
- **Backend**: [http://localhost:5000](http://localhost:5000)

---

## Running the Project with Docker

### 1. Pull the Docker Image

First, pull the pre-built Docker image from the repository:

```bash
docker pull bkarthik7/healthcare-management-system:latest
```

### 2. Build the Docker Image

Build the Docker image using the provided `Dockerfile`:

```bash
docker build -t bkarthik7/healthcare-system .
```

### 3. Run the Docker Container

Run the Docker container with the necessary ports exposed:

```bash
docker run -p 5173:5173 -p 5174:5174 -p 4000:4000 bkarthik7/healthcare-system
```

### 4. Access the Application

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Admin Panel**: [http://localhost:5174](http://localhost:5174)
- **Backend**: [http://localhost:4000](http://localhost:4000)

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

---

## Project Structure

```
.
├── admin
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.svg
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets/
│   │   ├── components
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── context
│   │   │   ├── AdminContext.jsx
│   │   │   ├── AppContext.jsx
│   │   │   └── DoctorContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── pages
│   │       ├── Admin
│   │       │   ├── AddDoctor.tsx
│   │       │   ├── AllAppointments.jsx
│   │       │   ├── Dashboard.jsx
│   │       │   └── DoctorsList.jsx
│   │       ├── Doctor
│   │       │   ├── DoctorAppointments.jsx
│   │       │   ├── DoctorDashboard.jsx
│   │       │   ├── DoctorProfile.jsx
│   │       │   ├── PatientReports.jsx
│   │       │   └── PatientsList.jsx
│   │       └── Login.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend
│   ├── config
│   │   ├── cloudinary.js
│   │   └── mongodb.js
│   ├── controllers
│   │   ├── adminController.js
│   │   ├── doctorController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── authAdmin.js
│   │   ├── authDoctor.js
│   │   ├── authUser.js
│   │   └── multer.js
│   ├── models
│   │   ├── appointmentModel.js
│   │   ├── doctorModel.js
│   │   └── userModel.js
│   ├── package.json
│   ├── package-lock.json
│   ├── routes
│   │   ├── adminRoute.js
│   │   ├── doctorRoute.js
│   │   └── userRoute.js
│   └── server.js
├── DockerCommands
├── Dockerfile
├── frontend
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── public
│   │   ├── favicon.svg
│   │   └── vite.svg
│   ├── README.md
│   ├── src
│   │   ├── App.jsx
│   │   ├── assets/
│   │   ├── components
│   │   │   ├── Banner.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── RelatedDoctors.jsx
│   │   │   ├── SpecialityMenu.jsx
│   │   │   └── TopDoctors.jsx
│   │   ├── context
│   │   │   └── AppContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── pages
│   │       ├── About.jsx
│   │       ├── Appointment.jsx
│   │       ├── Contact.jsx
│   │       ├── Doctors.jsx
│   │       ├── Home.jsx
│   │       ├── Login.jsx
│   │       ├── MyAppointments.jsx
│   │       ├── MyProfile.jsx
│   │       └── Verify.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
└── Readme.md
```
