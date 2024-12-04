// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientList from './components/patients/PatientList';
import PatientForm from './components/patients/PatientForm';
import PatientDetail from './components/patients/PatientDetail';
import DoctorList from './components/doctors/DoctorList';
import DoctorForm from './components/doctors/DoctorForm';
import DoctorDetail from './components/doctors/DoctorDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientList />} />
        <Route path="/patients" element={<PatientList />} />
        <Route path="/patients/new" element={<PatientForm />} />
        <Route path="/patients/edit/:patientId" element={<PatientForm />} />
        <Route path="/patients/:patientId" element={<PatientDetail />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/doctors/new" element={<DoctorForm />} />
        <Route path="/doctors/edit/:doctorId" element={<DoctorForm />} />
        <Route path="/doctors/:doctorId" element={<DoctorDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
