import React, { useEffect, useState } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';

const SignUp = ({ closeForm }) => {
  const [userType, setUserType] = useState(''); // New state for user type
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [cnic, setCnic] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [gender, setGender] = useState('')
  const [profilePic, setProfilePic] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bio, setBio] = useState(''); // For doctor signup
  const [degree, setDegree] = useState(''); // For doctor signup
  const [designation, setDesignation] = useState(''); // For doctor signup
  const [page, setPage] = useState(1);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    Aos.init();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('password', password);
    formData.append('confirm_password', confirmPassword);
    formData.append('cnic', cnic);
    formData.append('contact_num', contactNum);
    formData.append('gender', gender)
    if (profilePic) formData.append('profile_pic', profilePic);

    // Add doctor-specific fields if signing up as a doctor
    if (userType === 'doctor') {
      formData.append('bio', bio);
      formData.append('degree', degree);
      formData.append('designation', designation);
    }

    try {
      const response = await fetch(
        userType === 'patient'
          ? 'http://localhost:8000/api/patients/'
          : 'http://localhost:8000/api/doctors/',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          closeForm();
        }, 3000);
      } else {
        const errorData = await response.json();
        alert(`Failed to create profile: ${JSON.stringify(errorData)}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white w-80 md:w-96 p-5 rounded-xl relative shadow-lg">
        {success ? (
          <div className="success-message bg-green-200 text-green-800 p-5 rounded-lg text-center">
            <span>✔ Profile Created Successfully!</span>
          </div>
        ) : (
          <form
            className="space-y-5"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeForm}
              aria-label="Close Sign-Up Form"
            >
              ✕
            </button>

            <h1 className="text-2xl font-semibold text-center text-gray-800">
              Register Yourself
            </h1>

            {page === 1 && (
              <>
                {!userType && (
                  <div className="space-y-3">
                    <button
                      type="button"
                      className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => setUserType('patient')}
                    >
                      Sign Up as Patient
                    </button>

                    <button
                      type="button"
                      className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600"
                      onClick={() => setUserType('doctor')}
                    >
                      Sign Up as Doctor
                    </button>
                  </div>
                )}

                {userType && (
                  <>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      aria-label="First Name"
                    />

                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      aria-label="Last Name"
                    />

                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      aria-label="Email"
                    />

                    <input
                      type="text"
                      placeholder="CNIC (e.g., 12345-6789012-3)"
                      className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                      value={cnic}
                      onChange={(e) => setCnic(e.target.value)}
                      required
                      aria-label="CNIC"
                    />

                    <button
                      type="button"
                      className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
                      onClick={() => setPage(2)}
                    >
                      Next
                    </button>
                  </>
                )}
              </>
            )}

            {page === 2 && (
              <>
                <input
                  type="text"
                  placeholder="Contact Number"
                  className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                  value={contactNum}
                  onChange={(e) => setContactNum(e.target.value)}
                  required
                  aria-label="Contact Number"
                />

                <input
                  type="file"
                  className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  aria-label="Profile Picture"
                />

                <input
                      type="text"
                      placeholder="Gender"
                      className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      aria-label="Gender"
                />

                {userType === 'doctor' && (
                  <>
                    <textarea
                      placeholder="Bio"
                      className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      required
                      aria-label="Bio"
                    />

                    <input
                      type="text"
                      placeholder="Degree"
                      className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      required
                      aria-label="Degree"
                    />

                    <input
                      type="text"
                      placeholder="Designation"
                      className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      required
                      aria-label="Designation"
                    />
                  </>
                )}

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-label="Password"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full py-3 px-2 bg-gray-100 rounded-lg focus:ring focus:ring-blue-200"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  aria-label="Confirm Password"
                />

                <div className="flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                    onClick={() => setPage(1)}
                  >
                    Previous
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
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

export default SignUp;