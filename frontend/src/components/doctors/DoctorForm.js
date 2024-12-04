import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DoctorForm = () => {
  const [doctor, setDoctor] = useState({
    _id: '',
    name: '',
    specialization: '',
    contact_info: { phone: '', email: '' },
    availability: [{ day: '', start_time: '', end_time: '' }],
    appointments: []
  });

  const { doctorId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (doctorId) {
      axios.get(`http://127.0.0.1:5000/doctors/${doctorId}`)
        .then(response => setDoctor(response.data));
    }
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Update the nested object for phone and email
    if (name.startsWith('contact_info')) {
      const [field, subfield] = name.split('.');
      setDoctor(prevState => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [subfield]: value,
        }
      }));
    } else {
      setDoctor(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (doctorId) {
      await axios.put(`http://127.0.0.1:5000/doctors/${doctorId}`, doctor);
    } else {
      await axios.post('http://127.0.0.1:5000/doctors', doctor);
    }
    navigate('/doctors');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">{doctorId ? 'Edit' : 'Add'} Doctor</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter doctor's name"
          />
        </div>
        
        {/* Specialization Field */}
        <div>
          <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">Specialization</label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter specialization"
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="contact_info.phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            id="phone"
            name="contact_info.phone"
            value={doctor.contact_info.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter phone number"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="contact_info.email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="contact_info.email"
            value={doctor.contact_info.email}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter email address"
          />
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
          {doctorId ? 'Update' : 'Create'} Doctor
        </button>
      </form>
    </div>
  );
};

export default DoctorForm;
