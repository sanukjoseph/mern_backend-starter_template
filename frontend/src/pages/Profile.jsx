// src/pages/Profile.jsx
import { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
// import useAuth from '../hooks/useAuth';

const Profile = () => {
//   const { user } = useAuth();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/users/me');
        setProfileData(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>User Profile</h1>
      {profileData ? (
        <div>
          <p>Name: {profileData.name}</p>
          <p>Email: {profileData.email}</p>
          {/* Add more profile details as necessary */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
