import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await axios.get('http://127.0.0.1:5000/patients');
      setPatients(response.data);
    };

    fetchPatients();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Patients</h2>

      <ul className="space-y-4">
        {patients.map((patient) => (
          <li key={patient._id} className="flex justify-between items-center p-4 border-b border-gray-200 rounded-lg hover:bg-gray-50">
            <Link
              to={`/patients/${patient._id}`}
              className="text-xl font-medium text-blue-600 hover:text-blue-800"
            >
              {patient.name}
            </Link>
            <Link
              to={`/patients/edit/${patient._id}`}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Edit
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-center">
        <Link
          to="/patients/new"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add New Patient
        </Link>
      </div>
    </div>
  );
};

export default PatientList;
