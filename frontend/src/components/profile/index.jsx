import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import { FiMail, FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import { useDemo } from '../../context/DemoContext';

const UserProfile = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { isDemo, dummyUser } = useDemo();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!isDemo) {
          const { data } = await getUser(userId);
          setUser(data);
        } else {
          setUser(dummyUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        navigate('/');
      }
    };
    fetchUser();
  }, [userId, navigate, isDemo, dummyUser]);

  const displayUser = isDemo ? dummyUser : user;

  return (
    <div className="profile-main">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img
              src="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              alt={displayUser.firstName}
            />
          </div>
          <h2>
            {displayUser.firstName} {displayUser.lastName}
          </h2>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <FiUser className="detail-icon" />
            <div className="detail-content">
              <label>Full Name</label>
              <p>
                {displayUser.firstName} {displayUser.lastName}
              </p>
            </div>
          </div>

          <div className="detail-item">
            <FiMail className="detail-icon" />
            <div className="detail-content">
              <label>Email</label>
              <p>{displayUser.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
