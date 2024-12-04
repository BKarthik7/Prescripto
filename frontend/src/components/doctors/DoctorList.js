import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get('http://127.0.0.1:5000/doctors');
      setDoctors(response.data);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Doctors</h2>
      
      {/* List of doctors */}
      <ul className="space-y-4">
        {doctors.map(doctor => (
          <li key={doctor._id} className="p-4 border rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
            <Link 
              to={`/doctors/${doctor._id}`} 
              className="text-xl font-semibold text-indigo-600 hover:text-indigo-800">
              {doctor.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Add New Doctor Button */}
      <div className="mt-6 text-center">
        <Link 
          to="/doctors/new" 
          className="inline-block py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          Add New Doctor
        </Link>
      </div>
    </div>
  );
};

export default DoctorList;
