// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [profilePicture, setProfilePicture] = useState(null);

  console.log(user)

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }
      await axios.put('/users/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Profile update failed.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Profile</h2>
      {
        user?.profilePicture &&
          <img src={`http://localhost:5000/${user.profilePicture}`} alt="Profile" />
        }
      
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setProfilePicture(e.target.files[0])}
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
