import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PatientReports = () => {
  const { id } = useParams()
  const [uploadedReports, setUploadedReports] = useState([])
  const { backendUrl } = useContext(AppContext)
  const { dToken } = useContext(DoctorContext)
  useEffect(() => {
    loadUploadedReports()
  }, [id]) 

  const loadUploadedReports = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/doctor/get-reports`, 
        { userId: id },
        { headers: { dToken } }
      );      

      if (data.success) {
        setUploadedReports(data.reports)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to load reports.')
    }
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Patient Reports</h1>
      <h2 className="text-xl font-semibold mb-4">Uploaded Reports</h2>
      
      {uploadedReports.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {uploadedReports.map((report, index) => (
            <li
              key={index}
              className="w-[200px] h-[200px] bg-white p-2 rounded-md shadow-md hover:shadow-lg transition-shadow flex items-center justify-center"
            >
              <a href={report} target="_blank" rel="noreferrer">
                {/* Displaying Image */}
                <img
                  src={report}
                  className="w-full h-full object-cover rounded-md"
                  alt="Uploaded report"
                />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No previous reports available.</p>
      )}
    </div>
  )
}

export default PatientReports
