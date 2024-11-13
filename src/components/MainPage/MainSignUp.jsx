import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import './MainSignUp'

const MainSignUp = ({ closeForm }) => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [gender, setGender] = useState('');
  const [contact_num, setContactNum] = useState('');
  const [profile_pic, setProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [page, setPage] = useState(1); // Page state to track form progress
  const [success, setSuccess] = useState(false); // For success message

  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirm_password) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('password', password);
    formData.append('confirm_password', confirm_password);
    formData.append('cnic', cnic);
    formData.append('gender', gender);
    formData.append('contact_num', contact_num);
    if (profile_pic) formData.append('profile_pic', profile_pic);

    try {
      const response = await fetch('http://localhost:8000/api/patients/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setSuccess(true); // Show success message
        setTimeout(() => {
          setSuccess(false);
          closeForm();
        }, 3000); // Close form after 3 seconds
      } else {
        const errorData = await response.json();
        alert("Failed to create patient profile: " + JSON.stringify(errorData));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='absolute mt-12 text-black'>
        {/* Success message */}
        {success ? (
          <div className="success-message bg-green-200 text-green-800 p-5 rounded-lg flex items-center space-x-2">
            <span className="tick-mark">✔</span>
            <span>Profile Created Successfully!</span>
          </div>
        ) : (
          <form className='w-80 md:w-96 space-y-5 bg-white p-5 rounded-xl relative' onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Close Button */}
            <button 
              type="button" 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" 
              onClick={closeForm}
            >
              &#x2715;
            </button>

            <h1 className='text-4xl font-semibold text-center text-backgroundColor'>Register Yourself</h1>

            {/* Page 1: Basic Information */}
            {page === 1 && (
              <>
                <div className='flex flex-col'>
                  <input
                    type="text"
                    placeholder='First Name'
                    className='py-3 px-2 bg-[#d5f2ec] text-black rounded-lg'
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className='flex flex-col'>
                  <input
                    type="text"
                    placeholder='Last Name'
                    className='py-3 px-2 bg-[#d5f2ec] text-black rounded-lg'
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>

                <div className='flex flex-col'>
                  <input
                    type="email"
                    placeholder='Email'
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className='flex flex-col'>
                  <input
                    type="text"
                    placeholder='CNIC'
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    required
                  />
                </div>

                <div className='flex flex-col'>
                  <input
                    type="text"
                    placeholder='Gender'
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                </div>

                <div className='flex justify-end'>
                  <button
                    type='button'
                    className='bg-backgroundColor text-white px-4 py-2 rounded-md hover:bg-yellow-300'
                    onClick={() => setPage(2)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Page 2: Additional Information */}
            {page === 2 && (
              <>
                <div className='flex flex-col'>
                  <input
                    type="text"
                    placeholder='Contact Number'
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
                    value={contact_num}
                    onChange={(e) => setContactNum(e.target.value)}
                    required
                  />
                </div>

                <div className='flex flex-col'>
                  <input
                    type="file"
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
                    onChange={(e) => setProfilePic(e.target.files[0])}
                  />
                </div>

                <div className='flex flex-col'>
                  <input
                    type="password"
                    placeholder='Password'
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='flex flex-col'>
                  <input
                    type="password"
                    placeholder='Confirm Password'
                    className='py-3 px-2 bg-[#d5f2ec] rounded-lg'
                    value={confirm_password}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div className='flex justify-between'>
                  <button
                    type='button'
                    className='bg-backgroundColor text-white px-4 py-2 rounded-md hover:bg-yellow-300'
                    onClick={() => setPage(1)}
                  >
                    Previous
                  </button>
                  <button type='submit' className='bg-backgroundColor text-white px-4 py-2 rounded-md hover:bg-yellow-300'>
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default MainSignUp;
