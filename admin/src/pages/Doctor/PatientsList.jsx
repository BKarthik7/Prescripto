import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';

const PatientsList = () => {
  const { dToken, appointments = [], getAppointments } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]);

  // Filter unique appointments based on user ID
  const uniqueAppointments = appointments.filter(
    (appointment, index, self) =>
      index === self.findIndex((t) => t.userData._id === appointment.userData._id)
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Patients List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {uniqueAppointments.map((appointment) => {
          const { userData } = appointment;
          if (!userData) return null;

          return (
            <div
              key={userData._id}
              className="w-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <a href={`/patients-report/${userData._id}`} className="block">
                {/* Profile Image */}
                <img
                  src={userData.image}
                  alt={`${userData.name}'s avatar`}
                  className="w-full h-[220px] object-cover"
                />
                {/* Patient Details */}
                <div className="p-4">
                  <h1 className="font-semibold text-lg text-gray-700 mb-2 truncate">
                    {userData.name}
                  </h1>
                  <p className="text-gray-500 text-sm truncate">Email: {userData.email}</p>
                  <p className="text-gray-500 text-sm truncate">Phone: {userData.phone}</p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PatientsList;
