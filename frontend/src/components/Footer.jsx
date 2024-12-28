import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="Company Logo" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
            This project streamlines healthcare management by allowing users to book doctor appointments, view profiles, and manage upcoming and past appointments. Key features include doctor listings by specialty, user login, and easy access to appointment details.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li><a href='/'>Home</a></li>
            <li><a href='/about'>About Us</a></li>
            <li><a href='/contact'>Contact</a></li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-999-999-9999</li>
            <li>dummy@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center text-gray-500'>
          <span className='text-lg font-semibold text-gray-800'>Made for DBS Project</span>
          <span className='block mt-2 text-sm text-gray-600'>by B Karthik and Ankit Singh</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
