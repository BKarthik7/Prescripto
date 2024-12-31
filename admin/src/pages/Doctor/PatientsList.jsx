import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'

const PatientsList = () => {
  const { dToken, appointments = [], getAppointments } = useContext(DoctorContext)

  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken, getAppointments])

  const uniqueAppointments = appointments.filter((appointment, index, self) => 
    index === self.findIndex((t) => t.userData._id === appointment.userData._id)
  );

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Patients List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uniqueAppointments.map(appointment => {
          const { userData } = appointment
          if (!userData) return null 

          return (
            <div
              key={userData._id}
              className="w-[220px] pt-1 bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <a href={`/patients-report/${userData._id}`}>
                <img
                  src={userData.image}
                  alt={`${userData.name}'s avatar`}
                  className="w-[210px] h-[210px] object-cover mx-auto"
                />
                <div className="p-4">
                  <h1 className="font-semibold text-lg text-gray-700 mb-2">{userData.name}</h1>
                  <p className="text-gray-500 mb-1">Email: {userData.email}</p>
                  <p className="text-gray-500">Phone: {userData.phone}</p>
                </div>
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PatientsList
