import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PatientForm = () => {
  const [patient, setPatient] = useState({
    _id: '',
    name: '',
    date_of_birth: '',
    contact_info: { phone: '', email: '' },
    medical_history: [{ condition: '', diagnosis_date: '', medications: [] }],
    allergies: [],
    appointments: []
  });

  const { patientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (patientId) {
      axios.get(`http://127.0.0.1:5000/patients/${patientId}`)
        .then(response => setPatient(response.data))
        .catch(error => console.error("Error fetching patient data:", error));
    }
  }, [patientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setPatient(prevState => ({
        ...prevState,
        [parent]: {
          ...prevState[parent],
          [child]: value
        }
      }));
    } else {
      setPatient(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (patientId) {
        await axios.put(`http://127.0.0.1:5000/patients/${patientId}`, patient);
      } else {
        await axios.post('http://127.0.0.1:5000/patients', patient);
      }
      navigate('/patients');
    } catch (error) {
      console.error("Error saving patient data:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">{patientId ? 'Edit' : 'Add'} Patient</h2>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            value={patient.date_of_birth}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Phone</label>
          <input
            type="text"
            name="contact_info.phone"
            value={patient.contact_info.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Email</label>
          <input
            type="email"
            name="contact_info.email"
            value={patient.contact_info.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Additional form fields can be added here, e.g., medical history, allergies, and appointments */}

        <div className="mt-6">
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {patientId ? 'Update' : 'Create'} Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
