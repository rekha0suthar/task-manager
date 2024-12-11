import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import './profile.css';
const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await getUser(userId);
      setUser(data);
    };
    fetchUser();
  }, [userId]);
  return (
    <div className="user-container">
      <div className="user-wrapper">
        <h2>User Profile</h2>
        <img
          src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
          alt={user.firstName}
        />
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <p>{user.email}</p>
      </div>
      <a href="/dashboard">Go Back</a>
    </div>
  );
};

export default UserProfile;
