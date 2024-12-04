import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const DoctorDetail = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:5000/doctors/${doctorId}`)
      .then(response => setDoctor(response.data));
  }, [doctorId]);

  if (!doctor) {
    return <div className="text-center text-xl text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Doctor Details</h2>
      <div className="space-y-4">
        <div>
          <p className="text-xl font-medium text-gray-700">Name:</p>
          <p className="text-lg text-gray-900">{doctor.name}</p>
        </div>
        
        <div>
          <p className="text-xl font-medium text-gray-700">Specialization:</p>
          <p className="text-lg text-gray-900">{doctor.specialization}</p>
        </div>

        <div>
          <p className="text-xl font-medium text-gray-700">Phone:</p>
          <p className="text-lg text-gray-900">{doctor.contact_info.phone}</p>
        </div>

        <div>
          <p className="text-xl font-medium text-gray-700">Email:</p>
          <p className="text-lg text-gray-900">{doctor.contact_info.email}</p>
        </div>

        <div>
          <p className="text-xl font-medium text-gray-700">Availability:</p>
          <ul className="list-disc pl-6">
            {doctor.availability.map((entry, index) => (
              <li key={index} className="text-lg text-gray-900">
                {entry.day}: {entry.start_time} - {entry.end_time}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium text-gray-700">Appointments:</p>
          <p className="text-lg text-gray-900">{doctor.appointments.join(', ')}</p>
        </div>

        <div className="mt-6 text-center">
          <Link 
            to={`/doctors/edit/${doctorId}`} 
            className="inline-block py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Edit Doctor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
