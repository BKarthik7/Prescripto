import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)
    const [tab, setTab] = useState('profile'); // 'profile' or 'reports'
    const [uploadedReports, setUploadedReports] = useState([]);
    const [file, setFile] = useState(null);

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    useEffect(() => {
        if (tab === 'reports') {
            loadUploadedReports();
        }
    }, [tab]);

    const loadUploadedReports = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/get-reports`,
                { userId: userData._id },
                { headers: { token } }
            );

            if (data.success) {
                setUploadedReports(data.reports);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to load reports.');
        }
    };


    const handleFileUpload = async (e) => {
        if (!file) return;

        // Check if the file is an image (MIME type check)
        if (!file.type.startsWith('image/')) {
            toast.error('Please upload an image file.');
            e.target.value = '';  // Clear the input event
            return;
        }

        const formData = new FormData();
        formData.append('reportFile', file);

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/upload-report`, formData, { headers: { token } });
            if (data.success) {
                toast.success('File uploaded successfully!');
                loadUploadedReports();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload the file.');
        }

        e.target.value = '';
    };

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    return userData ? (
        <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
            {/* Tabs */}
            <div className="flex space-x-4 border-b mb-4">
                <button
                    onClick={() => setTab('profile')}
                    className={`pb-2 ${tab === 'profile' ? 'border-b-2 border-primary' : 'text-gray-500'}`}
                >
                    Profile Info
                </button>
                <button
                    onClick={() => setTab('reports')}
                    className={`pb-2 ${tab === 'reports' ? 'border-b-2 border-primary' : 'text-gray-500'}`}
                >
                    Previous Reports
                </button>
            </div>
            {tab === 'profile' && (
                <div className='max-w-lg flex flex-col gap-2 text-sm pt-5'>
                    {isEdit
                        ? <label htmlFor='image' >
                            <div className='inline-block relative cursor-pointer'>
                                <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
                            </div>
                            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                        </label>
                        : <img className='w-36 rounded' src={userData.image} alt="" />
                    }

                    {isEdit
                        ? <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                        : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
                    }

                    <hr className='bg-[#ADADAD] h-[1px] border-none' />

                    <div>
                        <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                            <p className='font-medium'>Email id:</p>
                            <p className='text-blue-500'>{userData.email}</p>
                            <p className='font-medium'>Phone:</p>

                            {isEdit
                                ? <input className='bg-gray-50 max-w-52' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                                : <p className='text-blue-500'>{userData.phone}</p>
                            }

                            <p className='font-medium'>Address:</p>

                            {isEdit
                                ? <p>
                                    <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                                    <br />
                                    <input className='bg-gray-50' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
                                : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                            }

                        </div>
                    </div>
                    <div>
                        <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
                        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                            <p className='font-medium'>Gender:</p>

                            {isEdit
                                ? <select className='max-w-20 bg-gray-50' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                    <option value="Not Selected">Not Selected</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                : <p className='text-gray-500'>{userData.gender}</p>
                            }

                            <p className='font-medium'>Birthday:</p>

                            {isEdit
                                ? <input className='max-w-28 bg-gray-50' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                                : <p className='text-gray-500'>{userData.dob}</p>
                            }

                        </div>
                    </div>
                    <div className='mt-10'>

                        {isEdit
                            ? <button onClick={updateUserProfileData} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Save information</button>
                            : <button onClick={() => setIsEdit(true)} className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all'>Edit</button>
                        }

                    </div>
                </div>
            )}
            {/* Previous Reports Section */}
            {tab === 'reports' && (
                <div className="space-y-8">
                    <div>
                        {/* File Upload Section */}
                        <label htmlFor='reportUpload' className="block">
                            <div className='inline-block relative cursor-pointer'>
                                <img className='w-36 rounded opacity-60' src={file ? URL.createObjectURL(file) : assets.upload_image} alt="" />
                                <img className='w-10 absolute bottom-12 right-12' src={file ? '' : assets.upload_icon} alt="" />
                            </div>
                            {/* File Input */}
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                id="reportUpload"
                                hidden
                            />
                        </label>
                        {/* Upload Button */}
                        <div className="mt-4">
                            <button
                                onClick={handleFileUpload}
                                className='border border-primary px-6 py-2 rounded-full text-primary hover:bg-primary hover:text-white transition-all'>
                                Upload Report
                            </button>
                        </div>
                    </div>

                    {/* Uploaded Reports List */}
                    <h2 className="text-xl font-semibold mb-4">Uploaded Reports</h2>
                    {uploadedReports.length > 0 ? (
                        <ul className="space-y-4 h-[400px] overflow-y-auto flex flex-wrap justify-start gap-4">
                            {uploadedReports.map((report) => (
                                <li
                                    key={report.id}
                                    className="flex items-center justify-center bg-white p-4 rounded-md shadow-md hover:shadow-lg transition-shadow w-[200px] h-[200px] flex-shrink-0"
                                >
                                    {/* Displaying Image */}
                                    <img
                                        src={report}
                                        className="w-full h-full object-cover rounded-md"
                                        alt="Uploaded report"
                                    />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No previous reports available.</p>
                    )}
                </div>
            )}


        </div>
    ) : null

}

export default MyProfile