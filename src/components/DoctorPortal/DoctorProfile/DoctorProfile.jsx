import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DoctorProfile = () => {
  const { pk } = useParams(); // Get doctor ID from URL params
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    contact_num: '',
    cnic: '',
    profile_pic: null,
    bio: '',
    degree: '',
    designation: '',
    password: '',
    confirm_password: '',
  });

  
  const defaultProfilePic = '/src/assets/img/default-doctor.jpg'; // The path to your default image

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/doctors/${pk}/`);
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
        setFormData({
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          contact_num: data.contact_num,
          cnic: data.cnic,
          profile_pic: null,
          bio: data.bio,
          degree: data.degree,
          designation: data.designation,
        });
      } else {
        setErrorMessage(data.error || 'Error fetching profile');
      }
    } catch (error) {
      setErrorMessage('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [pk]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage(''); // Clear success message before updating

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'profile_pic' && formData.profile_pic) {
        form.append(key, formData.profile_pic);
      } else if (key !== 'profile_pic') {
        form.append(key, formData[key]);
      }
    });

    try {
      const response = await fetch(`http://localhost:8000/api/doctors/${pk}/`, {
        method: 'PUT',
        body: form,
      });

      if (response.ok) {
        setErrorMessage('');
        setSuccessMessage('Profile updated successfully!'); // Set success message
        setIsEditing(false);
        await fetchProfile(); // Refresh profile data
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error updating profile');
      }
    } catch (error) {
      setErrorMessage('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/doctors/${pk}/`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setErrorMessage('');
          navigate('/'); // Redirect
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.error || 'Error deleting profile');
        }
      } catch (error) {
        setErrorMessage('Network error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFileChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      profile_pic: e.target.files[0],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 rounded-md">
      <h2 className="text-2xl font-semibold text-center mt-20"></h2>

      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
      {successMessage && (
        <div className="text-green-500 bg-green-100 p-3 rounded-md mb-4">
          {successMessage}
        </div>
      )}

      {!isEditing ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profile?.profile_pic || defaultProfilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md mb-4 transform transition-transform duration-300 hover:scale-105"
          />
          <h2 className="text-xl font-semibold text-gray-800">{profile?.first_name} {profile?.last_name}</h2>
          <p className="text-gray-500 italic">{profile?.designation}</p>
        </div>
      
        {/* Profile Details */}
        <div className="space-y-4 text-left">
          <p>
            <strong className="text-gray-700">Email:</strong> {profile?.email}
          </p>
          <p>
            <strong className="text-gray-700">Contact Number:</strong> {profile?.contact_num}
          </p>
          <p>
            <strong className="text-gray-700">CNIC:</strong> {profile?.cnic}
          </p>
          <p>
            <strong className="text-gray-700">Bio:</strong> {profile?.bio || 'No bio available'}
          </p>
          <p>
            <strong className="text-gray-700">Degree:</strong> {profile?.degree || 'N/A'}
          </p>
          <p>
            <strong className="text-gray-700">Designation:</strong> {profile?.designation || 'N/A'}
          </p>
        </div>
      
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-blue-600 transform transition-transform duration-300 hover:scale-105"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-lg hover:bg-red-600 transform transition-transform duration-300 hover:scale-105"
            onClick={handleDelete}
          >
            Delete Profile
          </button>
        </div>
      </div>
      
      ) : (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="contact_num"
            value={formData.contact_num}
            onChange={handleChange}
            placeholder="Contact Number"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="cnic"
            value={formData.cnic}
            onChange={handleChange}
            placeholder="CNIC"
            className="p-3 border border-gray-300 rounded-md"
          />
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            placeholder="Degree"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            name="profile_pic"
            onChange={handleFileChange}
            className="p-3 border border-gray-300 rounded-md"
          />
          <img
            src={
              formData.profile_pic
                ? URL.createObjectURL(formData.profile_pic)
                : profile?.profile_pic || defaultProfilePic
            }
            alt="Profile Preview"
            className="w-32 h-32 rounded-full"
          />
          <button type="submit" className="bg-blue-500 text-white p-3 rounded-md">
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default DoctorProfile;
