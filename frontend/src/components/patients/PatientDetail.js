import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const PatientDetail = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/patients/${patientId}`)
      .then(response => setPatient(response.data))
      .catch(error => console.error("Error fetching patient data:", error));
  }, [patientId]);

  if (!patient) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Patient Details</h2>

      <div className="mb-4">
        <p className="text-xl font-medium text-gray-700">Name:</p>
        <p className="text-lg text-gray-600">{patient.name}</p>
      </div>

      <div className="mb-4">
        <p className="text-xl font-medium text-gray-700">Date of Birth:</p>
        <p className="text-lg text-gray-600">{patient.date_of_birth}</p>
      </div>

      <div className="mb-4">
        <p className="text-xl font-medium text-gray-700">Phone:</p>
        <p className="text-lg text-gray-600">{patient.contact_info.phone}</p>
      </div>

      <div className="mb-4">
        <p className="text-xl font-medium text-gray-700">Email:</p>
        <p className="text-lg text-gray-600">{patient.contact_info.email}</p>
      </div>

      <div className="mb-4">
        <p className="text-xl font-medium text-gray-700">Medical History:</p>
        <ul className="list-disc pl-6 space-y-2">
          {patient.medical_history.map((entry, index) => (
            <li key={index} className="text-lg text-gray-600">
              {entry.condition} - {entry.diagnosis_date}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-4">
        <p className="text-xl font-medium text-gray-700">Allergies:</p>
        <p className="text-lg text-gray-600">{patient.allergies.join(', ')}</p>
      </div>

      <div className="mb-4">
        <p className="text-xl font-medium text-gray-700">Appointments:</p>
        <p className="text-lg text-gray-600">{patient.appointments.join(', ')}</p>
      </div>

      <div className="mt-6">
        <Link
          to={`/patients/edit/${patientId}`}
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Patient
        </Link>
      </div>
    </div>
  );
};

export default PatientDetail;
