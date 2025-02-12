import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { FiArrowLeft, FiMail, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './profile.css';

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await getUser(userId);
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/');
      }
    };
    fetchUser();
  }, [userId, navigate]);

  return (
    <div className="profile-main">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              alt={user.firstName}
            />
          </div>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <FiUser className="detail-icon" />
            <div className="detail-content">
              <label>Full Name</label>
              <p>
                {user.firstName} {user.lastName}
              </p>
            </div>
          </div>

          <div className="detail-item">
            <FiMail className="detail-icon" />
            <div className="detail-content">
              <label>Email</label>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
